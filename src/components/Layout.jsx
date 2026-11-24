import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useStock } from "../context/StockContext.jsx";

const menu = [
  { to: "/", label: "Dashboard" },
  { to: "/produtos", label: "Produtos" },
  { to: "/movimentacoes", label: "Movimentações" },
  { to: "/relatorios", label: "Relatórios" },
  { to: "/configuracoes", label: "Configurações" },
];

const titulos = Object.fromEntries(menu.map((m) => [m.to, m.label]));

export default function Layout() {
  const [aberto, setAberto] = useState(false);
  const { usuario, setUsuario } = useStock();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const sair = () => {
    setUsuario(null);
    navigate("/login");
  };

  return (
    <div className="app">
      <aside className={`sidebar ${aberto ? "aberto" : ""}`}>
        <div className="logo">SmartStock</div>
        <nav>
          {menu.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} onClick={() => setAberto(false)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button className="link-btn sidebar-sair" onClick={sair}>Sair</button>
      </aside>

      {aberto && <div className="overlay" onClick={() => setAberto(false)} />}

      <div className="main">
        <header className="topbar">
          <div className="topbar-esq">
            <button className="menu-btn" onClick={() => setAberto(true)} aria-label="Abrir menu">☰</button>
            <h1 className="topbar-titulo">{titulos[pathname] || "SmartStock"}</h1>
          </div>
          <div className="usuario">
            <span>{usuario?.nome}</span>
            <div className="avatar">{usuario?.nome?.[0] || "U"}</div>
          </div>
        </header>
        <main className="conteudo">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
