import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { KpiCard, StatusBadge, formatarData, PageHeader } from "../components/ui.jsx";
import { useStock } from "../context/StockContext.jsx";

const MESES = ["Jun", "Jul", "Ago", "Set", "Out", "Nov"];

export default function Dashboard() {
  const { produtos, movimentacoes } = useStock();

  const totalUnidades = produtos.reduce((s, p) => s + p.quantidade, 0);
  const estoqueBaixo = produtos.filter((p) => p.quantidade <= p.estoqueMinimo);
  const recentes = [...movimentacoes].sort((a, b) => b.data.localeCompare(a.data)).slice(0, 5);

  const serie = MESES.map((mes, i) => {
    const mesNum = String(i + 6).padStart(2, "0");
    const doMes = movimentacoes.filter((m) => m.data.slice(5, 7) === mesNum);
    return {
      mes,
      Entradas: doMes.filter((m) => m.tipo === "ENTRADA").reduce((s, m) => s + m.quantidade, 0),
      Saídas: doMes.filter((m) => m.tipo === "SAIDA").reduce((s, m) => s + m.quantidade, 0),
    };
  });

  const nomeDoProduto = (id) => produtos.find((p) => p.id === id)?.nome ?? "Produto removido";

  return (
    <>
      <PageHeader titulo="Visão geral" subtitulo="Indicadores do seu estoque" />

      <section className="grid-kpi">
        <KpiCard label="Total de produtos" valor={produtos.length} detalhe="Cadastrados" />
        <KpiCard label="Unidades em estoque" valor={totalUnidades.toLocaleString("pt-BR")} detalhe="Soma de todos os itens" />
        <KpiCard label="Estoque baixo" valor={estoqueBaixo.length} detalhe="Abaixo do mínimo" tom="negativo" />
        <KpiCard label="Movimentações" valor={movimentacoes.length} detalhe="Registradas" tom="positivo" />
      </section>

      <section className="grid-2">
        <div className="card">
          <h3>Entradas x Saídas (6 meses)</h3>
          <div className="chart">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={serie}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Entradas" fill="#1E6BFF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Saídas" fill="#93C5FD" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h3>Alertas de reposição</h3>
          {estoqueBaixo.length === 0 && <p className="muted">Nenhum produto abaixo do mínimo.</p>}
          <ul className="lista">
            {estoqueBaixo.map((p) => (
              <li key={p.id}>
                <div>
                  <strong>{p.nome}</strong>
                  <span className="muted small">Saldo: {p.quantidade} · Mínimo: {p.estoqueMinimo}</span>
                </div>
                <StatusBadge quantidade={p.quantidade} minimo={p.estoqueMinimo} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="card">
        <h3>Movimentações recentes</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Data</th><th>Produto</th><th>Tipo</th><th>Quantidade</th></tr>
            </thead>
            <tbody>
              {recentes.map((m) => (
                <tr key={m.id}>
                  <td>{formatarData(m.data)}</td>
                  <td>{nomeDoProduto(m.produtoId)}</td>
                  <td><span className={`badge ${m.tipo === "ENTRADA" ? "ok" : "critico"}`}>{m.tipo === "ENTRADA" ? "Entrada" : "Saída"}</span></td>
                  <td>{m.tipo === "ENTRADA" ? "+" : "-"}{m.quantidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
