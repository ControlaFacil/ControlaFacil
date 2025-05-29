import { useNavigate } from "react-router-dom";

export function Cadastro() {
  const navigate = useNavigate();

  const handleCadastro = () => {
    navigate("/home");
  };

  return (
    <div>
      <h1>Cadastro</h1>
      <button onClick={handleCadastro}>Cadastrar e ir para Home</button>
    </div>
  );
}
