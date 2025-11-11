import { useEffect, useState } from "react";
import styles from "./style/MeusDados.module.css";
// Importamos as máscaras para formatar os dados APÓS a busca, garantindo consistência visual.

// Máscara para CNPJ: 00.000.000/0000-00
const maskCnpj = (value) => {
    const cleanValue = String(value).replace(/\D/g, "");
    return cleanValue.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        "$1.$2.$3/$4-$5"
    );
};

// Máscara para Telefone: (00) 0000-0000 ou (00) 00000-0000
const maskTelefone = (value) => {
    const cleanValue = String(value).replace(/\D/g, "");
    if (cleanValue.length === 10) {
        return cleanValue.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
    } else if (cleanValue.length === 11) {
        return cleanValue.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    }
    return value; // Retorna o original se o formato for estranho
};

// Máscara para CEP: 00000-000
const maskCep = (value) => {
    const cleanValue = String(value).replace(/\D/g, "");
    return cleanValue.replace(/^(\d{5})(\d{3})$/, "$1-$2");
};


export function MeusDados() {
    // ... (Estados e useEffect inalterados)
    const [usuario, setUsuario] = useState({
        nomeEmpresa: "",
        cnpj: "",
        telefone: "",
        email: "",
        senha: "",
        confirmarSenha: "",
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

    useEffect(() => {
        const fetchDadosUsuario = async () => {
            const usuarioId = localStorage.getItem("usuarioId");
            // ... (Lógica de fetch de dados, mantida como estava)
            if (!usuarioId) {
                console.warn("⚠️ Nenhum ID de usuário encontrado.");
                return;
            }
            try {
                console.log("🔍 Buscando dados do usuário com ID:", usuarioId);
                const response = await fetch(`/api/usuarios/${usuarioId}`);
                const text = await response.text();
                const parsed = text ? JSON.parse(text) : null;
                const data = parsed?.data;

                if (!response.ok || !data) {
                    console.error("❌ Erro ao buscar dados:", response.status);
                    return;
                }

                setUsuario({
                    nomeEmpresa: data.razaoSocial || "",
                    cnpj: data.cnpj || "",
                    telefone: data.telefone || "",
                    email: data.email || "",
                    senha: "",
                    confirmarSenha: "",
                });

                const enderecoRes = await fetch(`/api/endereco/usuario/${usuarioId}`);
                const enderecoText = await enderecoRes.text();
                const enderecoParsed = enderecoText ? JSON.parse(enderecoText) : null;
                
                if (enderecoRes.ok && Array.isArray(enderecoParsed?.enderecos) && enderecoParsed.enderecos.length > 0) {
                    const primeiroEndereco = enderecoParsed.enderecos[0];
                    setEndereco({
                        rua: primeiroEndereco.rua || "",
                        numero: primeiroEndereco.numero?.toString() || "",
                        bairro: primeiroEndereco.bairro || "",
                        cidade: primeiroEndereco.cidade || "",
                        estado: primeiroEndereco.estado || "",
                        cep: primeiroEndereco.cep || "",
                        complemento: primeiroEndereco.complemento || "",
                    });
                }
            } catch (error) {
                console.error("❌ Erro ao buscar dados do usuário:", error);
            }
        };
        fetchDadosUsuario();
    }, []);
    // ...

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <h2 className={styles.title}>Meus Dados</h2>
                
                <h3 className={styles.subtitle}>Dados da Empresa</h3>
                
                {/* Visualização de Dados da Empresa */}
                <div className={styles.dataGrid}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Razão Social:</label>
                        <input className={styles.input} type="text" value={usuario.nomeEmpresa} disabled />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label className={styles.label}>CNPJ:</label>
                        <input className={styles.input} type="text" value={maskCnpj(usuario.cnpj)} disabled />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>E-mail:</label>
                        <input className={styles.input} type="text" value={usuario.email} disabled />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Telefone:</label>
                        <input className={styles.input} type="text" value={maskTelefone(usuario.telefone)} disabled />
                    </div>
                </div>

                <h3 className={styles.subtitle}>Endereço da Empresa</h3>

                {/* Visualização de Endereço */}
                <div className={styles.dataGrid}>
                    <div className={styles.formGroupFull}>
                        <label className={styles.label}>Rua:</label>
                        <input className={styles.input} type="text" value={endereco.rua} disabled />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Número:</label>
                        <input className={styles.input} type="text" value={endereco.numero} disabled />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Bairro:</label>
                        <input className={styles.input} type="text" value={endereco.bairro} disabled />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Cidade:</label>
                        <input className={styles.input} type="text" value={endereco.cidade} disabled />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Estado:</label>
                        <input className={styles.input} type="text" value={endereco.estado} disabled />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>CEP:</label>
                        <input className={styles.input} type="text" value={maskCep(endereco.cep)} disabled />
                    </div>

                    <div className={styles.formGroupFull}>
                        <label className={styles.label}>Complemento:</label>
                        <input className={styles.input} type="text" value={endereco.complemento} disabled />
                    </div>
                </div>

                {/* Botão de Edição (Sugestão para funcionalidade futura) */}
                <div className={styles.buttonContainer}>
                    <button type="button" className={styles.editBtn}>Editar Dados</button>
                </div>

            </div>
        </div>
    );
}