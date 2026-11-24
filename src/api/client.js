// Cliente HTTP da API SmartStock.
// Em desenvolvimento, a URL vem de VITE_API_URL (arquivo .env do front-end).
const BASE = import.meta.env.VITE_API_URL || "http://localhost:3333";

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${BASE}/api${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new Error("Não foi possível conectar à API. Verifique se o back-end está rodando.");
  }
  if (res.status === 204) return null;
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detalhes = data.detalhes?.length ? `\n${data.detalhes.join("\n")}` : "";
    throw new Error((data.erro || "Erro inesperado.") + detalhes);
  }
  return data;
}

export const api = {
  listarProdutos: () => request("/produtos"),
  criarProduto: (dados) => request("/produtos", { method: "POST", body: JSON.stringify(dados) }),
  atualizarProduto: (id, dados) => request(`/produtos/${id}`, { method: "PUT", body: JSON.stringify(dados) }),
  excluirProduto: (id) => request(`/produtos/${id}`, { method: "DELETE" }),
  listarMovimentacoes: () => request("/movimentacoes?limite=500"),
  registrarMovimentacao: (dados) => request("/movimentacoes", { method: "POST", body: JSON.stringify(dados) }),
};
