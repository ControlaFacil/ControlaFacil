import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style/Cadastro.module.css";
import logo from "../assets/logo.controlafacil.jpg";

export function Cadastro() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [usuario, setUsuario] = useState({
    nomeEmpresa: "",
    cnpj: "",
    telefone: "",
    email: "",
    senhaHash: "",
    confirmarSenha: ""
  });

  const [endereco, setEndereco] = useState({
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: "",
    complemento: ""
  });

  const handleChange = (e, stateSetter) => {
    const { name, value } = e.target;
    stateSetter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usuario.senhaHash !== usuario.confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    console.log("Usuário:", usuario);
    console.log("Endereço:", endereco);
    navigate("/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <div className={styles.steps}>
          <div className={step === 1 ? styles.stepActive : styles.step}>Empresa</div>
          <div className={styles.line}></div>
          <div className={step === 2 ? styles.stepActive : styles.step}>Endereço</div>
          <div className={styles.line}></div>
          <div className={step === 3 ? styles.stepActive : styles.step}>Cadastro</div>
        </div>

        <form className={styles.card} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Crie sua conta</h2>
          <h2 className={styles.subtitle}>
            {step === 1
              ? "Dados da empresa"
              : step === 2
              ? "Endereço da empresa"
              : "Cadastro de acesso"}
          </h2>

          {step === 1 && (
            <>
              <label className={styles.label}>Razão Social:</label>
              <input
                type="text"
                name="nomeEmpresa"
                value={usuario.nomeEmpresa}
                onChange={(e) => handleChange(e, setUsuario)}
                className={styles.input}
              />

              <label className={styles.label}>CNPJ:</label>
              <input
                type="text"
                name="cnpj"
                value={usuario.cnpj}
                onChange={(e) => handleChange(e, setUsuario)}
                className={styles.input}
              />

              <label className={styles.label}>Telefone:</label>
              <input
                type="text"
                name="telefone"
                value={usuario.telefone}
                onChange={(e) => handleChange(e, setUsuario)}
                className={styles.input}
              />
            </>
          )}

          {step === 2 && (
            <>
              <label className={styles.label}>Rua:</label>
              <input
                type="text"
                name="rua"
                value={endereco.rua}
                onChange={(e) => handleChange(e, setEndereco)}
                className={styles.input}
              />

              <label className={styles.label}>Número:</label>
              <input
                type="number"
                name="numero"
                value={endereco.numero}
                onChange={(e) => handleChange(e, setEndereco)}
                className={styles.input}
              />

              <label className={styles.label}>Bairro:</label>
              <input
                type="text"
                name="bairro"
                value={endereco.bairro}
                onChange={(e) => handleChange(e, setEndereco)}
                className={styles.input}
              />

              <label className={styles.label}>Cidade:</label>
              <input
                type="text"
                name="cidade"
                value={endereco.cidade}
                onChange={(e) => handleChange(e, setEndereco)}
                className={styles.input}
              />

              <label className={styles.label}>Estado:</label>
              <input
                type="text"
                name="estado"
                value={endereco.estado}
                maxLength={2}
                onChange={(e) => handleChange(e, setEndereco)}
                className={styles.input}
              />

              <label className={styles.label}>CEP:</label>
              <input
                type="text"
                name="cep"
                value={endereco.cep}
                onChange={(e) => handleChange(e, setEndereco)}
                className={styles.input}
              />

              <label className={styles.label}>Complemento:</label>
              <input
                type="text"
                name="complemento"
                value={endereco.complemento}
                onChange={(e) => handleChange(e, setEndereco)}
                className={styles.input}
              />
            </>
          )}

          {step === 3 && (
            <>
              <label className={styles.label}>E-mail:</label>
              <input
                type="email"
                name="email"
                value={usuario.email}
                onChange={(e) => handleChange(e, setUsuario)}
                className={styles.input}
              />

              <label className={styles.label}>Senha:</label>
              <input
                type="password"
                name="senhaHash"
                value={usuario.senhaHash}
                onChange={(e) => handleChange(e, setUsuario)}
                className={styles.input}
              />

              <label className={styles.label}>Confirmar senha:</label>
              <input
                type="password"
                name="confirmarSenha"
                value={usuario.confirmarSenha}
                onChange={(e) => handleChange(e, setUsuario)}
                className={styles.input}
              />
            </>
          )}
{step === 1 && (
  <button
    type="button"
    className={styles.button}
    onClick={() => setStep(2)}
  >
    Próximo
  </button>
)}

{step === 2 && (
  <>
    <button
      type="button"
      className={styles.button}
      onClick={() => setStep(1)}
      style={{ backgroundColor: "#d1d5db", color: "#374151", marginBottom: "8px" }}
    >
      Voltar
    </button>
    <button
      type="button"
      className={styles.button}
      onClick={() => setStep(3)}
    >
      Próximo
    </button>
  </>
)}

{step === 3 && (
  <>
    <button
      type="button"
      className={styles.button}
      onClick={() => setStep(2)}
      style={{ backgroundColor: "#d1d5db", color: "#374151", marginBottom: "8px" }}
    >
      Voltar
    </button>
    <button type="submit" className={styles.button}>
      Finalizar
    </button>
            </>
          )}
        </form>
      </div>

      <div className={styles.rightSide}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>
    </div>
  );
}
