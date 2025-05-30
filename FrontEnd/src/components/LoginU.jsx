import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./style/LoginU.module.css";
import logo from "../assets/logo.controlafacil.jpg"; // ajuste para .png se necessário

export function LoginU() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    // Aqui você pode validar com API
    console.log("Login:", login);
    console.log("Senha:", senha);
    navigate("/home");
  };

  return (
    <div className={styles.tela}>
      <div className={styles.login}>
        <div className={styles.loginajuste}>
          <h1>Seja Bem-Vindo ao Controla Fácil</h1>
          <h2>Faça seu login</h2>

          <h3>Login</h3>
          <input
            type="text"
            name="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />

          <h3>Senha</h3>
          <input
            type="password"
            name="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <h4>
            <Link to="/cadastro">Não tem conta? Crie aqui</Link>
          </h4>
          <h5>
            <Link to="/recuperar-senha">Esqueceu a senha? Recupere aqui</Link>
          </h5>

          <button className={styles.botao} onClick={handleLogin}>
            Entrar
          </button>
        </div>
      </div>

      <div className={styles.imagem}>
        <img src={logo} alt="Logo" />
      </div>
    </div>
  );
}
