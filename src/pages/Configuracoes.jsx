import { useState } from "react";
import { PageHeader } from "../components/ui.jsx";

export default function Configuracoes() {
  const [empresa, setEmpresa] = useState("Minha Empresa Ltda.");
  const [notifica, setNotifica] = useState(true);
  const [salvo, setSalvo] = useState(false);

  return (
    <>
      <PageHeader titulo="Configurações" subtitulo="Empresa, notificações e integrações" />
      <section className="grid-2">
        <form className="card form-stack" onSubmit={(e) => { e.preventDefault(); setSalvo(true); }}>
          <h3>Dados da empresa</h3>
          <label className="campo"><span>Nome da empresa</span>
            <input value={empresa} onChange={(e) => { setEmpresa(e.target.value); setSalvo(false); }} />
          </label>
          {salvo && <p className="sucesso">Alterações salvas.</p>}
          <button type="submit" className="btn primary">Salvar</button>
        </form>

        <div className="card form-stack">
          <h3>Notificações</h3>
          <label className="toggle-row">
            <span>Alerta de estoque mínimo</span>
            <input type="checkbox" checked={notifica} onChange={(e) => setNotifica(e.target.checked)} />
          </label>
          <h3>Integrações</h3>
          <div className="toggle-row"><span>Agente de IA</span><span className="badge alerta">Em breve</span></div>
          <div className="toggle-row"><span>N8N (automações)</span><span className="badge alerta">Em breve</span></div>
        </div>
      </section>
    </>
  );
}
