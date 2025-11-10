// src/components/LoginU.jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// Importa os estilos CSS Module
import styles from "./style/LoginU.module.css";
// A importação da imagem do logo foi removida para resolver o erro.

export function LoginU() {
  const navigate = useNavigate();
  // Estados para os campos de formulário
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [rememberMe, setRememberMe] = useState(false); 

  // Função para lidar com o login ao submeter o formulário
  const handleLogin = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    
    try {
      console.log("📤 Tentando login com:", login, " | Lembrar-me:", rememberMe);

      const response = await fetch("/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: login, senha: senha }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok || !data.usuario || !data.usuario.id) {
        alert(data.error || "Erro ao fazer login. Verifique suas credenciais.");
        return;
      }
      
      localStorage.setItem("usuarioId", data.usuario.id);

      alert("Login realizado com sucesso!");
      navigate("/home"); // Redireciona em caso de sucesso
    } catch (error) {
      console.error("❌ Erro ao fazer login:", error.message);
      alert("Erro ao fazer login: " + error.message);
    }
  };

  return (
    // Container principal que centraliza tudo (simula o <body>)
    <div className={styles.body}> 
      {/* Container do layout de duas colunas */}
      <div className={styles.loginContainer}>
        
        {/* Lado Esquerdo: Branding e Informações (Sem Imagem) */}
        <div className={styles.loginBranding}>
          <h1>Controla Fácil</h1>
          <p>Gerenciamento de Logística Simplificado</p>
        </div>
        
        {/* Lado Direito: Área do Formulário */}
        <div className={styles.loginFormArea}>
          <div className={styles.formHeader}>
            <h2>Bem-Vindo de Volta!</h2>
            <p>Faça seu login para acessar o painel.</p>
          </div>
          
          {/* Formulário de Login */}
          <form onSubmit={handleLogin} className={styles.loginForm}>
            
            {/* Campo Usuário/E-mail */}
            <div className={styles.inputGroup}>
              <label htmlFor="username">Usuário</label>
              <div className={styles.inputFieldWrapper}>
                {/* Ícone (requer Font Awesome na aplicação) */}
                <i className="fas fa-user icon"></i> 
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Seu usuário ou e-mail"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {/* Campo Senha */}
            <div className={styles.inputGroup}>
              <label htmlFor="password">Senha</label>
              <div className={styles.inputFieldWrapper}>
                <i className="fas fa-lock icon"></i>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {/* Opções: Lembrar-me e Esqueceu a Senha */}
            <div className={styles.formOptions}>
              <label className={styles.rememberMe}>
                <input 
                    type="checkbox" 
                    name="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                /> 
                Lembrar-me
              </label>
              {/* Link para recuperação de senha (usa react-router-dom Link) */}
              <Link to="/recuperar-senha" className={styles.forgotPassword}>
                Esqueceu a senha?
              </Link>
            </div>
            
            {/* Botão de Entrar */}
            <button type="submit" className={styles.btnLogin}>
              Entrar
            </button>
            
            {/* Link para Cadastro */}
            <div className={styles.signupLink}>
              <p>Não tem uma conta? <Link to="/cadastro">Crie aqui</Link></p>
            </div>
          </form>
          
          {/* Versão do Aplicativo */}
          <p className={styles.appVersion}>v1.0.0</p>
        </div>
      </div>
    </div>
  );
}