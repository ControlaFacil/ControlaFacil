import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style/Cadastro.module.css";
// Removido: import logo from "../assets/logo.controlafacil.jpg";
import { CheckCircle, Shield, Headset } from 'lucide-react'; // Importado CheckCircle para uso no Stepper

import { ToastContainer, toast } from 'react-toastify';

// CORREÇÃO UX/DATA: Lista de estados revisada para ter os nomes corretos
const ESTADOS = [
    { uf: "AC", nome: "Acre" }, { uf: "AL", nome: "Alagoas" }, { uf: "AP", nome: "Amapá" }, { uf: "AM", nome: "Amazonas" },
    { uf: "BA", nome: "Bahia" }, { uf: "CE", nome: "Ceará" }, { uf: "DF", nome: "Distrito Federal" }, { uf: "ES", nome: "Espírito Santo" },
    { uf: "GO", nome: "Goiás" }, { uf: "MA", nome: "Maranhão" }, { uf: "MT", nome: "Mato Grosso" }, { uf: "MS", nome: "Mato Grosso do Sul" },
    { uf: "MG", nome: "Minas Gerais" }, { uf: "PA", nome: "Pará" }, { uf: "PB", nome: "Paraíba" }, { uf: "PR", nome: "Paraná" },
    { uf: "PE", nome: "Pernambuco" }, { uf: "PI", nome: "Piauí" }, { uf: "RJ", nome: "Rio de Janeiro" }, { uf: "RN", nome: "Rio Grande do Norte" },
    { uf: "RS", nome: "Rio Grande do Sul" }, { uf: "RO", nome: "Rondônia" }, { uf: "RR", nome: "Roraima" }, { uf: "SC", nome: "Santa Catarina" },
    { uf: "SP", nome: "São Paulo" }, { uf: "SE", nome: "Sergipe" }, { uf: "TO", nome: "Tocantins" },
];

/**
 * Funções de Máscara (Formatação com Regex)
 */

// Máscara para CNPJ: 00.000.000/0000-00
const maskCnpj = (value) => {
    const cleanValue = value.replace(/\D/g, "");
    const limitedValue = cleanValue.substring(0, 14);

    return limitedValue.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        "$1.$2.$3/$4-$5"
    );
};

// Máscara para Telefone: (00) 0000-0000 ou (00) 00000-0000
const maskTelefone = (value) => {
    const cleanValue = value.replace(/\D/g, "");
    const limitedValue = cleanValue.substring(0, 11);

    if (limitedValue.length <= 10) {
        return limitedValue.replace(
            /^(\d{2})(\d{4})(\d{4})$/,
            "($1) $2-$3"
        );
    } else {
        return limitedValue.replace(
            /^(\d{2})(\d{5})(\d{4})$/,
            "($1) $2-$3"
        );
    }
};

// Máscara para CEP: 00000-000
const maskCep = (value) => {
    const cleanValue = value.replace(/\D/g, "");
    const limitedValue = cleanValue.substring(0, 8);

    return limitedValue.replace(
        /^(\d{5})(\d{3})$/,
        "$1-$2"
    );
};

export function Cadastro() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const [usuario, setUsuario] = useState({
        razaoSocial: "",
        cnpj: "",
        telefoneEmpresa: "",
        email: "",
        senha: "",
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

    // UX: Função para auto-preenchimento do endereço via ViaCEP
    const fetchCepData = async (cepValue) => {
        const cleanCep = cepValue.replace(/\D/g, "");
        if (cleanCep.length === 8) {
            try {
                // Acessa a API do ViaCEP
                const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    toast.warning("CEP não encontrado.");
                    return;
                }

                setEndereco(prev => ({
                    ...prev,
                    rua: data.logradouro || prev.rua,
                    bairro: data.bairro || prev.bairro,
                    cidade: data.localidade || prev.cidade,
                    estado: data.uf || prev.estado, // Popula o UF
                    // Não preenche 'numero' nem 'complemento'
                }));
                // Feedback suave
                toast.info("Endereço preenchido automaticamente! Por favor, confira os dados.");

            } catch (error) {
                console.error("Erro ao buscar CEP:", error);
                // Não exibe erro para o usuário se for apenas uma falha de conexão
            }
        }
    };


    const handleChange = (e, setter) => {
        const { name, value } = e.target;
        let newValue = value;

        // Aplica as máscaras com base no nome do campo
        switch (name) {
            case "cnpj":
                newValue = maskCnpj(value);
                break;
            case "telefoneEmpresa":
                newValue = maskTelefone(value);
                break;
            case "cep":
                newValue = maskCep(value);
                // UX: Chamada para buscar o CEP se estiver completo
                if (newValue.replace(/\D/g, "").length === 8) {
                    fetchCepData(newValue);
                }
                break;
            case "numero":
                // Garante que "numero" só aceite dígitos (e vazio)
                newValue = value.replace(/\D/g, "").substring(0, 10);
                break;
            default:
                break;
        }

        setter(prev => ({
            ...prev,
            [name]: newValue
        }));
    };

    const handleNext = () => {
        if (step === 1) {
            // Validação de formato antes de avançar para garantir a máscara
            if (usuario.cnpj && usuario.cnpj.replace(/\D/g, "").length !== 14) {
                toast.error("O CNPJ deve ter 14 dígitos.");
                return;
            }
            if (usuario.telefoneEmpresa && usuario.telefoneEmpresa.replace(/\D/g, "").length < 10) {
                toast.error("O telefone deve ter no mínimo 10 dígitos (DDD + 8 ou 9 dígitos).");
                return;
            }
            if (!usuario.razaoSocial || !usuario.cnpj || !usuario.telefoneEmpresa) {
                toast.error("Preencha todos os campos obrigatórios da Etapa 1.");
                return;
            }
        }
        if (step === 2) {
            // Validação de formato antes de avançar para garantir a máscara
            if (endereco.cep && endereco.cep.replace(/\D/g, "").length !== 8) {
                toast.error("O CEP deve ter 8 dígitos.");
                return;
            }
            // Verifica se 'estado' foi selecionado (o value="" é a primeira opção)
            if (!endereco.rua || !endereco.numero || !endereco.bairro || !endereco.cidade || !endereco.estado || !endereco.cep) {
                toast.error("Preencha todos os campos obrigatórios da Etapa 2.");
                return;
            }
        }
        if (step < 3) {
            setStep(step + 1);
        }
    };

    const handlePrev = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };
    
    const stepSubtitle = useMemo(() => {
        switch (step) {
            case 1:
                return "Dados da empresa (CNPJ e contato)";
            case 2:
                return "Endereço da sede da empresa";
            case 3:
                return "Defina seu e-mail e senha de acesso";
            default:
                return "";
        }
    }, [step]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (usuario.senha !== usuario.confirmarSenha) {
            toast.error("As senhas não coincidem.");
            return;
        }
        
        // Adiciona validação de formato final para garantir
        if (usuario.cnpj.replace(/\D/g, "").length !== 14 || 
            endereco.cep.replace(/\D/g, "").length !== 8 ||
            usuario.telefoneEmpresa.replace(/\D/g, "").length < 10) {
            toast.error("Um ou mais campos (CNPJ, Telefone, CEP) estão incompletos ou inválidos.");
            return;
        }


        try {
            console.log("Enviando dados do endereço:", endereco);

            const enderecoPayload = {
                ...endereco,
                cep: endereco.cep.replace(/\D/g, ""), // Limpa o CEP antes de enviar
                numero: endereco.numero 
            };


            const enderecoRes = await fetch("/api/endereco", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(enderecoPayload)
            });

            const enderecoText = await enderecoRes.text();
            const enderecoData = enderecoText ? JSON.parse(enderecoText) : {};

            if (!enderecoRes.ok) {
                let erroEndereco = "Erro ao cadastrar endereço.";
                try {
                    const json = JSON.parse(enderecoText);
                    erroEndereco = json.message || erroEndereco;
                } catch {
                    erroEndereco = enderecoText || erroEndereco;
                }
                toast.error(erroEndereco);
                return;
            }

            if (!enderecoData.endereco || !enderecoData.endereco.id) {
                toast.error("Erro: ID do endereço não retornado.");
                return;
            }

            const idEndereco = enderecoData.endereco.id;

            const usuarioPayload = {
                cnpj: usuario.cnpj.replace(/\D/g, ""),
                razaoSocial: usuario.razaoSocial,
                apelidoEmpresa: usuario.razaoSocial,
                email: usuario.email,
                telefone: usuario.telefoneEmpresa.replace(/\D/g, ""),
                senha: usuario.senha,
                endereco: idEndereco
            };

            console.log("Enviando dados do usuário com endereço:", usuarioPayload);

            const usuarioRes = await fetch("/api/usuarios", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(usuarioPayload)
            });

            const rawUsuarioText = await usuarioRes.text();
            const usuarioData = rawUsuarioText ? JSON.parse(rawUsuarioText) : {};

            console.log("Resposta do cadastro de usuário:", usuarioData);

            if (!usuarioRes.ok) {
                let erroUsuario = "Erro ao cadastrar usuário.";
                try {
                    const json = JSON.parse(rawUsuarioText);
                    erroUsuario = json.message || erroUsuario;
                } catch {
                    erroUsuario = rawUsuarioText || erroUsuario;
                }
                toast.error(erroUsuario);
                return;
            }

            const idUsuario =
                usuarioData.idUsuario?.id ||
                usuarioData.usuario?.id ||
                usuarioData.id ||
                usuarioData.data?.id ||
                null;


            if (!idUsuario) {
                toast.error("Erro: ID do usuário não retornado.");
                return;
            }

            console.log("Vinculando endereço ao usuário...", {
                idUsuario,
                idEndereco
            });

            const vinculoRes = await fetch("/api/endereco/vincular-usuario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    idUsuario,
                    idEndereco
                })
            });

            const vinculoText = await vinculoRes.text();
            const vinculoData = vinculoText ? JSON.parse(vinculoText) : {};

            if (!vinculoRes.ok) {
                let erroVinculo = "Erro ao vincular endereço ao usuário.";
                try {
                    const json = JSON.parse(vinculoText);
                    erroVinculo = json.message || erroVinculo;
                } catch {
                    erroVinculo = vinculoText || erroVinculo;
                }
                toast.error(erroVinculo);
                return;
            }

            const loginRes = await fetch("/api/usuarios/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: usuario.email,
                    senha: usuario.senha
                })
            });

            const loginText = await loginRes.text();
            const loginData = loginText ? JSON.parse(loginText) : {};

            if (!loginRes.ok || !loginData.usuario || !loginData.usuario.id) {
                toast.warning("Erro ao fazer login automático. Tente manualmente.");
                navigate("/login");
                return;
            }

            toast.success("Cadastro e login realizados com sucesso!");
            navigate("/home");

        } catch (err) {
            console.error("Erro inesperado:", err);
            toast.error("Erro inesperado. Verifique o console.");
        }
    };

    const isCompleted = (stepNumber) => step > stepNumber;
    const isActive = (stepNumber) => step === stepNumber;
    const isConnectorActive = (stepNumber) => step >= stepNumber + 1;


    return (
        <div className={styles['registration-container']}>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className={styles['registration-branding']}>
                {/* Removido: <img src={logo} alt="Controla Fácil Logo" className={styles.logo} /> */}
                <h1>Controla Fácil</h1>
                <p>Seu Gerenciamento de Logística Começa Aqui!</p>
                <div className={styles['branding-features']}>
                    <p>
                        <CheckCircle size={18} className={styles.iconFeature} /> Rápido e Intuitivo
                    </p>
                    <p>
                        <Shield size={18} className={styles.iconFeature} /> Seguro e Confiável
                    </p>
                    <p>
                        <Headset size={18} className={styles.iconFeature} /> Suporte Dedicado
                    </p>
                </div>
            </div>

            <div className={styles['registration-form-area']}>
                
                <div className={styles.stepper}>
                    {/* UI/UX: Step 1 com ícone de check se concluído */}
                    <div className={`${styles.step} ${isActive(1) ? styles.active : ''} ${isCompleted(1) ? styles.completed : ''}`} data-step="1">
                        <span className={styles['step-number']}>
                            {isCompleted(1) ? <CheckCircle size={16} /> : 1} 
                        </span>
                        <span className={styles['step-label']}>Empresa</span>
                    </div>
                    <div className={`${styles['step-connector']} ${isConnectorActive(1) ? styles.active : ''}`}></div>

                    {/* UI/UX: Step 2 com ícone de check se concluído */}
                    <div className={`${styles.step} ${isActive(2) ? styles.active : ''} ${isCompleted(2) ? styles.completed : ''}`} data-step="2">
                        <span className={styles['step-number']}>
                            {isCompleted(2) ? <CheckCircle size={16} /> : 2}
                        </span>
                        <span className={styles['step-label']}>Endereço</span>
                    </div>
                    <div className={`${styles['step-connector']} ${isConnectorActive(2) ? styles.active : ''}`}></div>

                    {/* Step 3 (Ativo ou Inativo) */}
                    <div className={`${styles.step} ${isActive(3) ? styles.active : ''}`} data-step="3">
                        <span className={styles['step-number']}>3</span>
                        <span className={styles['step-label']}>Acesso</span> {/* Label reduzido para melhor UI em telas pequenas */}
                    </div>
                </div>

                <form id="registrationForm" onSubmit={handleSubmit}>
                    <div className={styles['form-header']}>
                        <h2>Crie sua conta</h2>
                        <p className={styles['step-subtitle']}>{stepSubtitle}</p>
                    </div>

                    <div className={`${styles['form-step']} ${isActive(1) ? styles['current-step'] : ''}`} id="step1">
                        <div className={styles['input-group']}>
                            <label htmlFor="razaoSocial">Razão Social:</label>
                            <input type="text" id="razaoSocial" name="razaoSocial" value={usuario.razaoSocial} onChange={(e) => handleChange(e, setUsuario)} required />
                        </div>
                        <div className={styles['input-group']}>
                            <label htmlFor="cnpj">CNPJ:</label>
                            {/* UX: placeholder para guiar a máscara */}
                            <input type="text" id="cnpj" name="cnpj" placeholder="00.000.000/0000-00" value={usuario.cnpj} onChange={(e) => handleChange(e, setUsuario)} required maxLength={18} inputMode="numeric" /> 
                        </div>
                        <div className={styles['input-group']}>
                            <label htmlFor="telefoneEmpresa">Telefone:</label>
                            {/* UX: placeholder para guiar a máscara */}
                            <input type="tel" id="telefoneEmpresa" name="telefoneEmpresa" placeholder="(00) 00000-0000" value={usuario.telefoneEmpresa} onChange={(e) => handleChange(e, setUsuario)} required maxLength={15} inputMode="tel" />
                        </div>
                    </div>

                    <div className={`${styles['form-step']} ${isActive(2) ? styles['current-step'] : ''}`} id="step2">
                        <div className={styles['input-group']}>
                            <label htmlFor="cep">CEP:</label>
                            {/* UX: inputMode para teclado numérico */}
                            <input type="text" id="cep" name="cep" placeholder="00000-000" value={endereco.cep} onChange={(e) => handleChange(e, setEndereco)} required maxLength={9} inputMode="numeric" />
                        </div>
                        <div className={styles['input-group']}>
                            <label htmlFor="rua">Rua:</label>
                            {/* UX: o campo "Rua" agora pode ser preenchido automaticamente */}
                            <input type="text" id="rua" name="rua" value={endereco.rua} onChange={(e) => handleChange(e, setEndereco)} required />
                        </div>
                        <div className={styles['input-group']}>
                            <label htmlFor="numero">Número:</label>
                            {/* UX: inputMode para teclado numérico */}
                            <input type="text" id="numero" name="numero" value={endereco.numero} onChange={(e) => handleChange(e, setEndereco)} required inputMode="numeric" /> 
                        </div>
                        <div className={styles['input-group']}>
                            <label htmlFor="complemento">Complemento: (Opcional)</label> {/* UX: Indica que é opcional */}
                            <input type="text" id="complemento" name="complemento" value={endereco.complemento} onChange={(e) => handleChange(e, setEndereco)} />
                        </div>
                        <div className={styles['input-group']}>
                            <label htmlFor="bairro">Bairro:</label>
                            <input type="text" id="bairro" name="bairro" value={endereco.bairro} onChange={(e) => handleChange(e, setEndereco)} required />
                        </div>
                        <div className={styles['input-group']}>
                            <label htmlFor="cidade">Cidade:</label>
                            <input type="text" id="cidade" name="cidade" value={endereco.cidade} onChange={(e) => handleChange(e, setEndereco)} required />
                        </div>
                        <div className={styles['input-group']}>
                            <label htmlFor="estado">Estado (UF):</label>
                            <select id="estado" name="estado" value={endereco.estado} onChange={(e) => handleChange(e, setEndereco)} required>
                                <option value="">Selecione um estado</option>
                                {ESTADOS.map(estado => (
                                    <option key={estado.uf} value={estado.uf}>{`${estado.uf} - ${estado.nome}`}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={`${styles['form-step']} ${isActive(3) ? styles['current-step'] : ''}`} id="step3">
                        <div className={styles['input-group']}>
                            <label htmlFor="email">E-mail:</label>
                            <input type="email" id="email" name="email" value={usuario.email} onChange={(e) => handleChange(e, setUsuario)} required />
                        </div>
                        <div className={styles['input-group']}>
                            <label htmlFor="senha">Senha:</label>
                            <input type="password" id="senha" name="senha" value={usuario.senha} onChange={(e) => handleChange(e, setUsuario)} required />
                        </div>
                        <div className={styles['input-group']}>
                            <label htmlFor="confirmarSenha">Confirmar senha:</label>
                            <input type="password" id="confirmarSenha" name="confirmarSenha" value={usuario.confirmarSenha} onChange={(e) => handleChange(e, setUsuario)} required />
                        </div>
                    </div>

                    <div className={styles['navigation-buttons']}>
                        {step > 1 && (
                            <button type="button" id="prevBtn" className={styles['btn-secondary']} onClick={handlePrev}>
                                Voltar
                            </button>
                        )}
                        {step < 3 && (
                            <button type="button" id="nextBtn" className={styles['btn-primary']} onClick={handleNext}>
                                Próximo
                            </button>
                        )}
                        {step === 3 && (
                            <button type="submit" id="submitBtn" className={styles['btn-primary']}>
                                Finalizar Cadastro
                            </button>
                        )}
                    </div>
                </form>

                <div className={styles['login-link']}>
                    <p>Já tem uma conta? <a href="/">Faça login aqui</a></p>
                </div>
                <p className={styles['app-version']}>v1.0.0</p>
            </div>
        </div>
    );
}