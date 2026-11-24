import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api/client.js";

const StockContext = createContext(null);

export function StockProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erroGlobal, setErroGlobal] = useState("");

  // Traz produtos e movimentações da API.
  const carregar = useCallback(async () => {
    setCarregando(true);
    try {
      const [p, m] = await Promise.all([api.listarProdutos(), api.listarMovimentacoes()]);
      setProdutos(p.map(normalizarProduto));
      setMovimentacoes(m.map(normalizarMov));
      setErroGlobal("");
    } catch (err) {
      setErroGlobal(err.message);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    if (usuario) carregar();
  }, [usuario, carregar]);

  // Cada função lança erro em caso de falha; quem chama mostra a mensagem na tela.
  const addProduto = async (dados) => {
    await api.criarProduto(dados);
    await carregar();
  };

  const updateProduto = async (id, dados) => {
    await api.atualizarProduto(id, dados);
    await carregar();
  };

  const removeProduto = async (id) => {
    await api.excluirProduto(id);
    await carregar();
  };

  const registrarMovimentacao = async ({ produtoId, tipo, quantidade, observacao }) => {
    await api.registrarMovimentacao({ produtoId: Number(produtoId), tipo, quantidade: Number(quantidade), observacao });
    await carregar();
  };

  const value = useMemo(
    () => ({
      usuario, setUsuario, produtos, movimentacoes, carregando, erroGlobal, recarregar: carregar,
      addProduto, updateProduto, removeProduto, registrarMovimentacao,
    }),
    [usuario, produtos, movimentacoes, carregando, erroGlobal, carregar]
  );

  return <StockContext.Provider value={value}>{children}</StockContext.Provider>;
}

// A API devolve camelCase; o front-end usa a mesma convenção, então só garante os tipos.
function normalizarProduto(p) {
  return { ...p, preco: Number(p.preco) };
}
function normalizarMov(m) {
  return { ...m, produtoNome: m.produtoNome, data: String(m.data).slice(0, 10) };
}

export function useStock() {
  const ctx = useContext(StockContext);
  if (!ctx) throw new Error("useStock deve ser usado dentro de StockProvider");
  return ctx;
}
