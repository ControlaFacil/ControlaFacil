// src/components/LoginU.jsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./style/LoginU.module.css";

export function LoginU() {
  const navigate = useNavigate();
  // Estados para os campos de formulário
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  // NOVO: Estado para gerenciar o carregamento do botão
  const [isLoading, setIsLoading] = useState(false);
  // NOVO: Estado para exibir mensagens de erro/sucesso na UI
  const [message, setMessage] = useState(null);

  // Função para lidar com o login ao submeter o formulário
  const handleLogin = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    setIsLoading(true); // INÍCIO: Ativa o carregamento
    setMessage(null); // Limpa mensagens anteriores

    try {
      console.log("📤 Tentando login com:", login, " | Lembrar-me:", rememberMe);

      const response = await fetch("/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Nota: O backend espera 'email', mas o campo aceita usuário/email.
        body: JSON.stringify({ email: login, senha: senha }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok || !data.usuario || !data.usuario.id) {
        // MUDANÇA UX: Substituir alert por mensagem na UI
        setMessage({ 
          type: 'error', 
          text: data.error || "Erro ao fazer login. Verifique suas credenciais." 
        });
        setIsLoading(false); // FIM: Desativa o carregamento em caso de erro
        return;
      }
      
      localStorage.setItem("usuarioId", data.usuario.id);

      // MUDANÇA UX: Feedback de sucesso antes de redirecionar
      setMessage({ type: 'success', text: "Login realizado com sucesso! Redirecionando..." });
      
      // Atrasar o redirecionamento levemente para que a mensagem de sucesso seja vista
      setTimeout(() => {
        navigate("/home"); 
      }, 800);

    } catch (error) {
      console.error("❌ Erro ao fazer login:", error.message);
      // MUDANÇA UX: Substituir alert por mensagem na UI
      setMessage({ type: 'error', text: "Erro de conexão. Tente novamente mais tarde." });
      setIsLoading(false);
    }
    // A desativação final do loading é tratada dentro do try/catch para a navegação
    // ou no catch/erro para garantir o reset do botão.
  };

  return (
    // MUDANÇA A11Y: Usar <main> em vez de <div> com styles.body para semântica.
    <main className={styles.body}> 
      {/* Container do layout de duas colunas */}
      <div className={styles.loginContainer}>
        
        {/* Lado Esquerdo: Branding e Informações */}
        <div className={styles.loginBranding}>
          {/* MUDANÇA UI: Ícone de branding (ex: caminhão para logística) */}
          <i className={`fas fa-truck-moving ${styles.brandingIcon}`} aria-hidden="true"></i> 
          <h1>Controla Fácil</h1>
          <p>Gerenciamento de Logística Simplificado</p>
        </div>
        
        {/* Lado Direito: Área do Formulário */}
        <div className={styles.loginFormArea}>
          <div className={styles.formHeader}>
            <h2>Bem-Vindo de Volta!</h2>
            <p>Faça seu login para acessar o painel.</p>
          </div>

          {/* NOVO UX: Componente de Mensagem de Feedback */}
          {message && (
            <div className={`${styles.feedbackMessage} ${styles[message.type]}`}>
              {message.text}
            </div>
          )}
          
          {/* Formulário de Login */}
          <form onSubmit={handleLogin} className={styles.loginForm}>
            
            {/* Campo Usuário/E-mail */}
            <div className={styles.inputGroup}>
              {/* MUDANÇA UX: Rótulo mais claro */}
              <label htmlFor="username">E-mail ou Usuário</label>
              <div className={styles.inputFieldWrapper}>
                {/* MUDANÇA A11Y: Adicionar aria-hidden="true" ao ícone */}
                <i className="fas fa-user icon" aria-hidden="true"></i> 
                <input
                  // MUDANÇA CÓDIGO/UX: type="email" é mais adequado para a maioria dos logins
                  type="email" 
                  id="username"
                  name="username"
                  placeholder="Seu e-mail ou nome de usuário"
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
                {/* MUDANÇA A11Y: Adicionar aria-hidden="true" ao ícone */}
                <i className="fas fa-lock icon" aria-hidden="true"></i>
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
              {/* Link para recuperação de senha */}
              <Link to="/recuperar-senha" className={styles.forgotPassword}>
                Esqueceu a senha?
              </Link>
            </div>
            
            {/* Botão de Entrar */}
            <button 
              type="submit" 
              className={styles.btnLogin}
              // MUDANÇA UX: Desabilita o botão durante o carregamento
              disabled={isLoading}
            >
              {/* MUDANÇA UX/UI: Feedback de carregamento no botão */}
              {isLoading ? (
                <>
                    <i className="fas fa-spinner fa-spin" aria-hidden="true"></i> 
                    {' Entrando...'}
                </>
              ) : (
                <>
                    {'Entrar '}
                    {/* MUDANÇA UI: Ícone de ação no botão */}
                    <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </>
              )}
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
    </main>
  );
}