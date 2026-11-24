import { useState } from "react";
import { PageHeader, formatarData } from "../components/ui.jsx";
import { useStock } from "../context/StockContext.jsx";

export default function Movimentacoes() {
  const { produtos, movimentacoes, registrarMovimentacao } = useStock();
  const [tipo, setTipo] = useState("ENTRADA");
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const nomeDoProduto = (id) => produtos.find((p) => p.id === id)?.nome ?? "Produto removido";

  const enviar = async (e) => {
    e.preventDefault();
    setSucesso("");
    setErro("");
    try {
      await registrarMovimentacao({ produtoId, tipo, quantidade });
      setSucesso("Movimentação registrada.");
      setQuantidade("");
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <>
      <PageHeader titulo="Movimentação de estoque" subtitulo="Registre entradas e saídas" />

      <section className="grid-2 movim">
        <form className="card form-stack" onSubmit={enviar}>
          <h3>Nova movimentação</h3>
          <div className="segmento" role="radiogroup">
            <button type="button" className={tipo === "ENTRADA" ? "ativo entrada" : ""} onClick={() => setTipo("ENTRADA")}>Entrada</button>
            <button type="button" className={tipo === "SAIDA" ? "ativo saida" : ""} onClick={() => setTipo("SAIDA")}>Saída</button>
          </div>

          <label className="campo"><span>Produto</span>
            <select value={produtoId} onChange={(e) => setProdutoId(e.target.value)} required>
              <option value="">Selecione um produto</option>
              {produtos.map((p) => <option key={p.id} value={p.id}>{p.nome} (saldo: {p.quantidade})</option>)}
            </select>
          </label>
          <label className="campo"><span>Quantidade</span>
            <input type="number" min="1" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
          </label>

          {erro && <p className="erro">{erro}</p>}
          {sucesso && <p className="sucesso">{sucesso}</p>}
          <button type="submit" className="btn primary full">Registrar movimentação</button>
        </form>

        <div className="card">
          <h3>Histórico</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Data</th><th>Produto</th><th>Tipo</th><th>Qtd.</th></tr>
              </thead>
              <tbody>
                {movimentacoes.map((m) => (
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
        </div>
      </section>
    </>
  );
}
