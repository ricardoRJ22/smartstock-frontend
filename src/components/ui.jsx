export function StatusBadge({ quantidade, minimo }) {
  if (quantidade < minimo / 2) return <span className="badge critico">Crítico</span>;
  if (quantidade <= minimo) return <span className="badge alerta">Repor</span>;
  return <span className="badge ok">OK</span>;
}

export function KpiCard({ label, valor, detalhe, tom = "neutro" }) {
  return (
    <div className="card kpi">
      <span className="kpi-label">{label}</span>
      <strong className="kpi-valor">{valor}</strong>
      {detalhe && <span className={`kpi-detalhe ${tom}`}>{detalhe}</span>}
    </div>
  );
}

export function PageHeader({ titulo, subtitulo, children }) {
  return (
    <div className="page-header">
      <div>
        <h2>{titulo}</h2>
        {subtitulo && <p className="muted">{subtitulo}</p>}
      </div>
      {children && <div className="page-actions">{children}</div>}
    </div>
  );
}

export function Modal({ titulo, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal card" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{titulo}</h3>
          <button className="link-btn" onClick={onClose} aria-label="Fechar">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export const formatarMoeda = (v) => Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export const formatarData = (iso) => new Date(iso + "T00:00:00").toLocaleDateString("pt-BR");
