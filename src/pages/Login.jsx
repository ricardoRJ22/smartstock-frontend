import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStock } from "../context/StockContext.jsx";

export default function Login() {
  const { setUsuario } = useStock();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const entrar = (e) => {
    e.preventDefault();
    if (!email.includes("@") || senha.length < 4) {
      setErro("Informe um e-mail válido e uma senha com pelo menos 4 caracteres.");
      return;
    }
    // Autenticação simulada: a validação real entra no Dia 8 (API + JWT).
    setUsuario({ nome: email.split("@")[0] });
    navigate("/");
  };

  return (
    <div className="login-page">
      <form className="card login-card" onSubmit={entrar}>
        <div className="logo logo-login">SmartStock</div>
        <p className="muted">Gestão inteligente de estoque</p>

        <label className="campo">
          <span>E-mail</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seuemail@empresa.com.br" required />
        </label>
        <label className="campo">
          <span>Senha</span>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="••••••••" required />
        </label>

        {erro && <p className="erro">{erro}</p>}
        <button type="submit" className="btn primary full">Entrar</button>
      </form>
    </div>
  );
}
