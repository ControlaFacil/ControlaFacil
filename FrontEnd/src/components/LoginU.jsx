import { useNavigate } from "react-router-dom";

export function LoginU() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aqui você colocaria sua lógica de autenticação real
    navigate("/home");
  };

  return (
    <div>
      <h1>Vai trabalhar gu matos</h1>
      <button onClick={() => navigate("/cadastro")}>Não tem conta? Cadastre-se</button>
      <br />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}
