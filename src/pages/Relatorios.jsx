import { CATEGORIAS } from "../data/mock.js";
import { KpiCard, PageHeader, StatusBadge, formatarMoeda } from "../components/ui.jsx";
import { useStock } from "../context/StockContext.jsx";

function exportarCSV(linhas, nome) {
  const csv = linhas.map((l) => l.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(";")).join("\n");
  const url = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = nome;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Relatorios() {
  const { produtos, movimentacoes } = useStock();

  const valorEstoque = produtos.reduce((s, p) => s + p.quantidade * p.preco, 0);
  const baixos = produtos.filter((p) => p.quantidade <= p.estoqueMinimo);
  const entradas = movimentacoes.filter((m) => m.tipo === "ENTRADA");
  const saidas = movimentacoes.filter((m) => m.tipo === "SAIDA");
  const somaQtd = (lista) => lista.reduce((s, m) => s + m.quantidade, 0);

  const porCategoria = CATEGORIAS.map((cat) => {
    const itens = produtos.filter((p) => p.categoria === cat);
    return { cat, qtd: itens.reduce((s, p) => s + p.quantidade, 0), valor: itens.reduce((s, p) => s + p.quantidade * p.preco, 0) };
  }).filter((c) => c.qtd > 0);
  const maxQtd = Math.max(1, ...porCategoria.map((c) => c.qtd));

  const exportarProdutos = () =>
    exportarCSV(
      [["ID", "Nome", "Categoria", "Quantidade", "Estoque mínimo", "Preço", "Cadastro"],
       ...produtos.map((p) => [p.id, p.nome, p.categoria, p.quantidade, p.estoqueMinimo, p.preco.toFixed(2), p.dataCadastro])],
      "smartstock-produtos.csv"
    );

  return (
    <>
      <PageHeader titulo="Relatórios" subtitulo="Resumo do estoque e das movimentações">
        <button className="btn outline" onClick={exportarProdutos}>Exportar CSV</button>
      </PageHeader>

      <section className="grid-kpi">
        <KpiCard label="Produtos cadastrados" valor={produtos.length} />
        <KpiCard label="Estoque baixo" valor={baixos.length} tom="negativo" detalhe="Abaixo do mínimo" />
        <KpiCard label="Valor em estoque" valor={formatarMoeda(valorEstoque)} />
        <KpiCard label="Movimentações" valor={movimentacoes.length} detalhe={`${entradas.length} entradas · ${saidas.length} saídas`} />
      </section>

      <section className="grid-2">
        <div className="card">
          <h3>Posição por categoria</h3>
          <ul className="barras">
            {porCategoria.map((c) => (
              <li key={c.cat}>
                <div className="barra-rotulo"><span>{c.cat}</span><span className="muted small">{c.qtd} un. · {formatarMoeda(c.valor)}</span></div>
                <div className="barra-trilho"><div className="barra-preench" style={{ width: `${(c.qtd / maxQtd) * 100}%` }} /></div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3>Resumo das movimentações</h3>
          <table>
            <tbody>
              <tr><td>Entradas</td><td>{entradas.length} registros</td><td>+{somaQtd(entradas)} un.</td></tr>
              <tr><td>Saídas</td><td>{saidas.length} registros</td><td>-{somaQtd(saidas)} un.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="card">
        <h3>Produtos com estoque baixo</h3>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Produto</th><th>Categoria</th><th>Saldo</th><th>Mínimo</th><th>Status</th></tr></thead>
            <tbody>
              {baixos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nome}</td><td>{p.categoria}</td><td>{p.quantidade}</td><td>{p.estoqueMinimo}</td>
                  <td><StatusBadge quantidade={p.quantidade} minimo={p.estoqueMinimo} /></td>
                </tr>
              ))}
              {baixos.length === 0 && <tr><td colSpan={5} className="muted centro">Nenhum produto com estoque baixo.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
