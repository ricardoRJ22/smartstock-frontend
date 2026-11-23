import { createContext, useContext, useMemo, useState } from "react";
import { produtosIniciais, movimentacoesIniciais } from "../data/mock.js";

const StockContext = createContext(null);

export function StockProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
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
  );

  return <StockContext.Provider value={value}>{children}</StockContext.Provider>;
}

export function useStock() {
  const ctx = useContext(StockContext);
  if (!ctx) throw new Error("useStock deve ser usado dentro de StockProvider");
  return ctx;
}
