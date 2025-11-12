import { useEffect, useState } from "react";
import styles from "./style/MeusDados.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Edit, Save, XCircle } from 'lucide-react'; // Ícones para o botão

// --- Funções de Máscara (Mantidas e Aprimoradas) ---

// Máscara para CNPJ: 00.000.000/0000-00
const maskCnpj = (value) => {
    const cleanValue = String(value).replace(/\D/g, "");
    if (cleanValue.length !== 14) return cleanValue; // Se incompleto, retorna o valor limpo
    return cleanValue.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        "$1.$2.$3/$4-$5"
    );
};

// Máscara para Telefone: (00) 0000-0000 ou (00) 00000-0000
const maskTelefone = (value) => {
    const cleanValue = String(value).replace(/\D/g, "");
    if (cleanValue.length <= 10) {
        return cleanValue.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
    } else if (cleanValue.length === 11) {
        return cleanValue.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    }
    return cleanValue; 
};

// Máscara para CEP: 00000-000
const maskCep = (value) => {
    const cleanValue = String(value).replace(/\D/g, "");
    if (cleanValue.length !== 8) return cleanValue; // Se incompleto, retorna o valor limpo
    return cleanValue.replace(/^(\d{5})(\d{3})$/, "$1-$2");
};

// --- Lista de Estados (necessária para futura edição com <select>) ---
const ESTADOS = [
    { uf: "AC", nome: "Acre" }, { uf: "AL", nome: "Alagoas" }, { uf: "AP", nome: "Amapá" }, { uf: "AM", nome: "Amazonas" },
    { uf: "BA", nome: "Bahia" }, { uf: "CE", nome: "Ceará" }, { uf: "DF", nome: "Distrito Federal" }, { uf: "ES", nome: "Espírito Santo" },
    { uf: "GO", nome: "Goiás" }, { uf: "MA", nome: "Maranhão" }, { uf: "MT", nome: "Mato Grosso" }, { uf: "MS", nome: "Mato Grosso do Sul" },
    { uf: "MG", nome: "Minas Gerais" }, { uf: "PA", nome: "Pará" }, { uf: "PB", nome: "Paraíba" }, { uf: "PR", nome: "Paraná" },
    { uf: "PE", nome: "Pernambuco" }, { uf: "PI", nome: "Piauí" }, { uf: "RJ", nome: "Rio de Janeiro" }, { uf: "RN", nome: "Rio Grande do Norte" },
    { uf: "RS", nome: "Rio Grande do Sul" }, { uf: "RO", nome: "Rondônia" }, { uf: "RR", nome: "Roraima" }, { uf: "SC", nome: "Santa Catarina" },
    { uf: "SP", nome: "São Paulo" }, { uf: "SE", nome: "Sergipe" }, { uf: "TO", nome: "Tocantins" },
];


export function MeusDados() {
    const [usuario, setUsuario] = useState({
        nomeEmpresa: "",
        cnpj: "",
        telefone: "",
        email: "",
        senha: "",
        confirmarSenha: "",
        idEndereco: null, // Guardar o ID do endereço para PUT
    });

    const [endereco, setEndereco] = useState({
        rua: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: "",
        cep: "",
        complemento: "",
    });

    const [originalUsuario, setOriginalUsuario] = useState({}); // Para reverter
    const [originalEndereco, setOriginalEndereco] = useState({}); // Para reverter
    const [isEditing, setIsEditing] = useState(false); // UX: Controle do modo de edição

    useEffect(() => {
        const fetchDadosUsuario = async () => {
            const usuarioId = localStorage.getItem("usuarioId");
            if (!usuarioId) {
                console.warn("⚠️ Nenhum ID de usuário encontrado.");
                return;
            }
            try {
                // 1. Busca dados do Usuário/Empresa
                const response = await fetch(`/api/usuarios/${usuarioId}`);
                const text = await response.text();
                const parsed = text ? JSON.parse(text) : null;
                const data = parsed?.data;

                if (!response.ok || !data) {
                    console.error("❌ Erro ao buscar dados:", response.status);
                    return;
                }
                
                // Mapeia e salva os dados
                const userData = {
                    nomeEmpresa: data.razaoSocial || "",
                    cnpj: data.cnpj || "",
                    telefone: data.telefone || "",
                    email: data.email || "",
                    senha: "",
                    confirmarSenha: "",
                    idEndereco: data.enderecoId || null, // Assumindo que o ID do endereço está aqui
                };
                
                setUsuario(userData);
                setOriginalUsuario(userData); // Define o estado original

                // 2. Busca dados do Endereço
                const enderecoRes = await fetch(`/api/endereco/usuario/${usuarioId}`);
                const enderecoText = await enderecoRes.text();
                const enderecoParsed = enderecoText ? JSON.parse(enderecoText) : null;
                
                if (enderecoRes.ok && Array.isArray(enderecoParsed?.enderecos) && enderecoParsed.enderecos.length > 0) {
                    const primeiroEndereco = enderecoParsed.enderecos[0];
                    const addressData = {
                        rua: primeiroEndereco.rua || "",
                        numero: primeiroEndereco.numero?.toString() || "",
                        bairro: primeiroEndereco.bairro || "",
                        cidade: primeiroEndereco.cidade || "",
                        estado: primeiroEndereco.estado || "",
                        cep: primeiroEndereco.cep || "",
                        complemento: primeiroEndereco.complemento || "",
                        id: primeiroEndereco.id, // Guardar o ID para a requisição PUT
                    };
                    setEndereco(addressData);
                    setOriginalEndereco(addressData); // Define o estado original
                    setUsuario(prev => ({...prev, idEndereco: primeiroEndereco.id}));
                }
            } catch (error) {
                console.error("❌ Erro ao buscar dados do usuário:", error);
            }
        };
        fetchDadosUsuario();
    }, []);

    // Função de alteração de estado unificada
    const handleChange = (e, stateSetter) => {
        const { name, value } = e.target;
        let newValue = value;

        // Aplica as máscaras em tempo real
        if (name === "cnpj") {
            newValue = maskCnpj(value);
        } else if (name === "telefone") {
            newValue = maskTelefone(value);
        } else if (name === "cep") {
            newValue = maskCep(value);
        }

        stateSetter(prev => ({ ...prev, [name]: newValue }));
    };

    // UX: Alterna o modo de edição (Entrar / Cancelar)
    const handleEditToggle = (cancel = false) => {
        if (cancel) {
            // Reverte para os dados originais
            setUsuario(originalUsuario);
            setEndereco(originalEndereco);
            toast.info("Edição cancelada. Dados revertidos.");
        }
        setIsEditing(prev => !prev);
    };

    // UX: Lógica de envio (Simulada, mas com validações de formato)
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 1. Validação de Senha
        if (usuario.senha && usuario.senha !== usuario.confirmarSenha) {
            toast.error("As novas senhas não coincidem.");
            return;
        }

        // 2. Validação de Formato
        const cleanCnpj = usuario.cnpj.replace(/\D/g, "");
        const cleanTelefone = usuario.telefone.replace(/\D/g, "");
        const cleanCep = endereco.cep.replace(/\D/g, "");

        if (cleanCnpj.length !== 14) {
            toast.error("CNPJ inválido. Deve conter 14 dígitos.");
            return;
        }
        if (cleanTelefone.length < 10) {
            toast.error("Telefone inválido. Mínimo de 10 dígitos (DDD + número).");
            return;
        }
        if (cleanCep.length !== 8) {
            toast.error("CEP inválido. Deve conter 8 dígitos.");
            return;
        }
        
        // 3. Simulação de Envio
        toast.success("Dados atualizados com sucesso!");
        // Após o sucesso (e o fetch real), você atualizaria os estados originais:
        setOriginalUsuario(usuario);
        setOriginalEndereco(endereco);
        setIsEditing(false); // Retorna ao modo de visualização
    };

    const getEstadoNome = (uf) => {
        const estado = ESTADOS.find(e => e.uf === uf);
        return estado ? `${uf} - ${estado.nome}` : uf;
    };


    return (
        <div className={styles.container}>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            
            <form className={styles.formWrapper} onSubmit={handleSubmit}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Meus Dados</h2>
                    
                    {/* Botão de Edição/Salvar/Cancelar (UX: Feedback de modo) */}
                    <div className={styles.buttonContainer}>
                        {!isEditing ? (
                            <button type="button" className={styles.editBtn} onClick={() => handleEditToggle(false)}>
                                <Edit size={18} /> Editar Dados
                            </button>
                        ) : (
                            <>
                                <button type="button" className={`${styles.editBtn} ${styles.cancelBtn}`} onClick={() => handleEditToggle(true)}>
                                    <XCircle size={18} /> Cancelar
                                </button>
                                <button type="submit" className={`${styles.editBtn} ${styles.saveBtn}`}>
                                    <Save size={18} /> Salvar
                                </button>
                            </>
                        )}
                    </div>
                </div>
                
                <h3 className={styles.subtitle}>Dados da Empresa</h3>
                
                {/* Dados da Empresa */}
                <div className={styles.dataGrid}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Razão Social:</label>
                        <input 
                            className={styles.input} 
                            type="text" 
                            name="nomeEmpresa"
                            value={usuario.nomeEmpresa} 
                            onChange={(e) => handleChange(e, setUsuario)}
                            disabled={!isEditing} 
                            required 
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label className={styles.label}>CNPJ:</label>
                        <input 
                            className={styles.input} 
                            type="text" 
                            name="cnpj"
                            value={maskCnpj(usuario.cnpj)} 
                            onChange={(e) => handleChange(e, setUsuario)}
                            disabled={!isEditing} 
                            maxLength={18}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>E-mail:</label>
                        <input 
                            className={styles.input} 
                            type="email" 
                            name="email"
                            value={usuario.email} 
                            onChange={(e) => handleChange(e, setUsuario)}
                            disabled={!isEditing} 
                            required
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Telefone:</label>
                        <input 
                            className={styles.input} 
                            type="tel" 
                            name="telefone"
                            value={maskTelefone(usuario.telefone)} 
                            onChange={(e) => handleChange(e, setUsuario)}
                            disabled={!isEditing} 
                            maxLength={15}
                            required
                        />
                    </div>
                </div>

                {isEditing && (
                    <>
                        <h3 className={styles.subtitle}>Alterar Senha (Opcional)</h3>
                        <div className={styles.dataGrid}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Nova Senha:</label>
                                <input 
                                    className={styles.input} 
                                    type="password" 
                                    name="senha"
                                    value={usuario.senha} 
                                    onChange={(e) => handleChange(e, setUsuario)}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Confirmar Nova Senha:</label>
                                <input 
                                    className={styles.input} 
                                    type="password" 
                                    name="confirmarSenha"
                                    value={usuario.confirmarSenha} 
                                    onChange={(e) => handleChange(e, setUsuario)}
                                />
                            </div>
                        </div>
                    </>
                )}


                <h3 className={styles.subtitle}>Endereço da Empresa</h3>

                {/* Endereço */}
                <div className={styles.dataGrid}>
                    <div className={styles.formGroupFull}>
                        <label className={styles.label}>Rua:</label>
                        <input 
                            className={styles.input} 
                            type="text" 
                            name="rua"
                            value={endereco.rua} 
                            onChange={(e) => handleChange(e, setEndereco)}
                            disabled={!isEditing} 
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Número:</label>
                        <input 
                            className={styles.input} 
                            type="text" 
                            name="numero"
                            value={endereco.numero} 
                            onChange={(e) => handleChange(e, setEndereco)}
                            disabled={!isEditing} 
                            inputMode="numeric"
                            required
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Bairro:</label>
                        <input 
                            className={styles.input} 
                            type="text" 
                            name="bairro"
                            value={endereco.bairro} 
                            onChange={(e) => handleChange(e, setEndereco)}
                            disabled={!isEditing} 
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Cidade:</label>
                        <input 
                            className={styles.input} 
                            type="text" 
                            name="cidade"
                            value={endereco.cidade} 
                            onChange={(e) => handleChange(e, setEndereco)}
                            disabled={!isEditing} 
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Estado:</label>
                        {!isEditing ? (
                            // Visualização: campo de texto simples
                            <input className={styles.input} type="text" value={getEstadoNome(endereco.estado)} disabled />
                        ) : (
                            // Edição: campo de seleção
                            <select 
                                className={styles.input} 
                                name="estado" 
                                value={endereco.estado} 
                                onChange={(e) => handleChange(e, setEndereco)}
                                required
                            >
                                <option value="">Selecione um estado</option>
                                {ESTADOS.map(estado => (
                                    <option key={estado.uf} value={estado.uf}>{`${estado.uf} - ${estado.nome}`}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>CEP:</label>
                        <input 
                            className={styles.input} 
                            type="text" 
                            name="cep"
                            value={maskCep(endereco.cep)} 
                            onChange={(e) => handleChange(e, setEndereco)}
                            disabled={!isEditing} 
                            maxLength={9}
                            inputMode="numeric"
                            required
                        />
                    </div>

                    <div className={styles.formGroupFull}>
                        <label className={styles.label}>Complemento: (Opcional)</label>
                        <input 
                            className={styles.input} 
                            type="text" 
                            name="complemento"
                            value={endereco.complemento} 
                            onChange={(e) => handleChange(e, setEndereco)}
                            disabled={!isEditing} 
                        />
                    </div>
                </div>

            </form>
        </div>
    );
}