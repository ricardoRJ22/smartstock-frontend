<<<<<<< HEAD
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api/client.js";
=======
import { createContext, useContext, useMemo, useState } from "react";
import { produtosIniciais, movimentacoesIniciais } from "../data/mock.js";
>>>>>>> e488ef75f55fc95e44c0cea3fb845f88631efa94

const StockContext = createContext(null);

export function StockProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
<<<<<<< HEAD
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
=======
  const [produtos, setProdutos] = useState(produtosIniciais);
  const [movimentacoes, setMovimentacoes] = useState(movimentacoesIniciais);

  const addProduto = (dados) => {
    setProdutos((lista) => [
      ...lista,
      { ...dados, id: Date.now(), dataCadastro: new Date().toISOString().slice(0, 10) },
    ]);
  };

  const updateProduto = (id, dados) => {
    setProdutos((lista) => lista.map((p) => (p.id === id ? { ...p, ...dados } : p)));
  };

  const removeProduto = (id) => {
    setProdutos((lista) => lista.filter((p) => p.id !== id));
    setMovimentacoes((lista) => lista.filter((m) => m.produtoId !== id));
  };

  // Retorna null em caso de sucesso ou uma mensagem de erro.
  const registrarMovimentacao = ({ produtoId, tipo, quantidade }) => {
    const qtd = Number(quantidade);
    const produto = produtos.find((p) => p.id === Number(produtoId));
    if (!produto) return "Selecione um produto.";
    if (!qtd || qtd <= 0) return "A quantidade deve ser maior que zero.";
    if (tipo === "SAIDA" && qtd > produto.quantidade) {
      return `Saldo insuficiente. Disponível: ${produto.quantidade}.`;
    }
    const delta = tipo === "ENTRADA" ? qtd : -qtd;
    setProdutos((lista) => lista.map((p) => (p.id === produto.id ? { ...p, quantidade: p.quantidade + delta } : p)));
    setMovimentacoes((lista) => [
      { id: Date.now(), produtoId: produto.id, tipo, quantidade: qtd, data: new Date().toISOString().slice(0, 10) },
      ...lista,
    ]);
    return null;
  };

  const value = useMemo(
    () => ({ usuario, setUsuario, produtos, movimentacoes, addProduto, updateProduto, removeProduto, registrarMovimentacao }),
    [usuario, produtos, movimentacoes]
>>>>>>> e488ef75f55fc95e44c0cea3fb845f88631efa94
  );

  return <StockContext.Provider value={value}>{children}</StockContext.Provider>;
}

<<<<<<< HEAD
// A API devolve camelCase; o front-end usa a mesma convenção, então só garante os tipos.
function normalizarProduto(p) {
  return { ...p, preco: Number(p.preco) };
}
function normalizarMov(m) {
  return { ...m, produtoNome: m.produtoNome, data: String(m.data).slice(0, 10) };
}

=======
>>>>>>> e488ef75f55fc95e44c0cea3fb845f88631efa94
export function useStock() {
  const ctx = useContext(StockContext);
  if (!ctx) throw new Error("useStock deve ser usado dentro de StockProvider");
  return ctx;
}
