import { useMemo, useState } from "react";
import { CATEGORIAS } from "../data/mock.js";
import { Modal, PageHeader, StatusBadge, formatarMoeda, formatarData } from "../components/ui.jsx";
import { useStock } from "../context/StockContext.jsx";

const vazio = { nome: "", categoria: CATEGORIAS[0], quantidade: 0, estoqueMinimo: 0, preco: 0 };

export default function Produtos() {
  const { produtos, addProduto, updateProduto, removeProduto } = useStock();
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [editando, setEditando] = useState(null); // null | "novo" | produto
  const [form, setForm] = useState(vazio);
  const [erro, setErro] = useState("");

  const filtrados = useMemo(
    () =>
      produtos.filter(
        (p) =>
          (categoria === "Todas" || p.categoria === categoria) &&
          (p.nome.toLowerCase().includes(busca.toLowerCase()) || String(p.id).includes(busca))
      ),
    [produtos, busca, categoria]
  );

  const abrirNovo = () => {
    setForm(vazio);
    setErro("");
    setEditando("novo");
  };
  const abrirEdicao = (p) => {
    setForm({ ...p });
    setErro("");
    setEditando(p);
  };

  const salvar = (e) => {
    e.preventDefault();
    if (!form.nome.trim()) return setErro("O nome é obrigatório.");
    if (Number(form.preco) < 0 || Number(form.quantidade) < 0) return setErro("Valores não podem ser negativos.");
    const dados = { ...form, quantidade: Number(form.quantidade), estoqueMinimo: Number(form.estoqueMinimo), preco: Number(form.preco) };
    if (editando === "novo") addProduto(dados);
    else updateProduto(editando.id, dados);
    setEditando(null);
  };

  const excluir = (p) => {
    if (window.confirm(`Excluir "${p.nome}"? As movimentações dele também serão removidas.`)) removeProduto(p.id);
  };

  return (
    <>
      <PageHeader titulo="Produtos" subtitulo={`${produtos.length} itens cadastrados`}>
        <button className="btn primary" onClick={abrirNovo}>+ Novo produto</button>
      </PageHeader>

      <div className="filtros card">
        <input className="busca" placeholder="Buscar por nome ou ID" value={busca} onChange={(e) => setBusca(e.target.value)} />
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option>Todas</option>
          {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Nome</th><th>Categoria</th><th>Qtd.</th><th>Mín.</th><th>Preço</th><th>Cadastro</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((p) => (
              <tr key={p.id}>
                <td>P-{String(p.id).slice(-3)}</td>
                <td>{p.nome}</td>
                <td>{p.categoria}</td>
                <td>{p.quantidade}</td>
                <td>{p.estoqueMinimo}</td>
                <td>{formatarMoeda(p.preco)}</td>
                <td>{formatarData(p.dataCadastro)}</td>
                <td><StatusBadge quantidade={p.quantidade} minimo={p.estoqueMinimo} /></td>
                <td className="acoes">
                  <button className="link-btn" onClick={() => abrirEdicao(p)}>Editar</button>
                  <button className="link-btn danger" onClick={() => excluir(p)}>Excluir</button>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr><td colSpan={9} className="muted centro">Nenhum produto encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editando && (
        <Modal titulo={editando === "novo" ? "Novo produto" : "Editar produto"} onClose={() => setEditando(null)}>
          <form onSubmit={salvar} className="form-grid">
            <label className="campo full-col"><span>Nome</span>
              <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
            </label>
            <label className="campo"><span>Categoria</span>
              <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}>
                {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label className="campo"><span>Quantidade</span>
              <input type="number" min="0" value={form.quantidade} onChange={(e) => setForm({ ...form, quantidade: e.target.value })} />
            </label>
            <label className="campo"><span>Estoque mínimo</span>
              <input type="number" min="0" value={form.estoqueMinimo} onChange={(e) => setForm({ ...form, estoqueMinimo: e.target.value })} />
            </label>
            <label className="campo"><span>Preço (R$)</span>
              <input type="number" min="0" step="0.01" value={form.preco} onChange={(e) => setForm({ ...form, preco: e.target.value })} />
            </label>
            {erro && <p className="erro full-col">{erro}</p>}
            <div className="modal-acoes full-col">
              <button type="button" className="btn outline" onClick={() => setEditando(null)}>Cancelar</button>
              <button type="submit" className="btn primary">Salvar</button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
