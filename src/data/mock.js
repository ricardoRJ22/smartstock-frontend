// Dados de exemplo. Na etapa do Dia 8 serão substituídos pela API.
export const CATEGORIAS = ["Bebidas", "Alimentos", "Papelaria", "Limpeza", "Higiene", "Informática"];

export const produtosIniciais = [
  { id: 1, nome: "Café torrado 500g", categoria: "Bebidas", quantidade: 3, estoqueMinimo: 10, preco: 24.9, dataCadastro: "2026-11-02" },
  { id: 2, nome: "Papel A4 (cx.)", categoria: "Papelaria", quantidade: 12, estoqueMinimo: 15, preco: 129.0, dataCadastro: "2026-11-05" },
  { id: 3, nome: "Caneta azul", categoria: "Papelaria", quantidade: 48, estoqueMinimo: 20, preco: 2.5, dataCadastro: "2026-11-07" },
  { id: 4, nome: "Detergente 500ml", categoria: "Limpeza", quantidade: 90, estoqueMinimo: 30, preco: 3.8, dataCadastro: "2026-11-10" },
  { id: 5, nome: "Toner HP 85A", categoria: "Informática", quantidade: 1, estoqueMinimo: 2, preco: 389.0, dataCadastro: "2026-11-14" },
  { id: 6, nome: "Arroz 5kg", categoria: "Alimentos", quantidade: 40, estoqueMinimo: 15, preco: 27.5, dataCadastro: "2026-11-15" },
];

export const movimentacoesIniciais = [
  { id: 1, produtoId: 1, tipo: "ENTRADA", quantidade: 20, data: "2026-06-12" },
  { id: 2, produtoId: 2, tipo: "ENTRADA", quantidade: 30, data: "2026-07-03" },
  { id: 3, produtoId: 4, tipo: "ENTRADA", quantidade: 60, data: "2026-07-18" },
  { id: 4, produtoId: 3, tipo: "SAIDA", quantidade: 15, data: "2026-08-02" },
  { id: 5, produtoId: 6, tipo: "ENTRADA", quantidade: 25, data: "2026-08-20" },
  { id: 6, produtoId: 5, tipo: "SAIDA", quantidade: 2, data: "2026-09-09" },
  { id: 7, produtoId: 1, tipo: "SAIDA", quantidade: 9, data: "2026-09-25" },
  { id: 8, produtoId: 4, tipo: "SAIDA", quantidade: 25, data: "2026-10-11" },
  { id: 9, produtoId: 2, tipo: "SAIDA", quantidade: 18, data: "2026-10-28" },
  { id: 10, produtoId: 3, tipo: "ENTRADA", quantidade: 40, data: "2026-11-04" },
  { id: 11, produtoId: 1, tipo: "ENTRADA", quantidade: 5, data: "2026-11-18" },
  { id: 12, produtoId: 6, tipo: "SAIDA", quantidade: 6, data: "2026-11-21" },
];
