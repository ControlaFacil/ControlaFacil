import { useNavigate } from "react-router-dom";
import styles from './style/HeaderU.module.css';
import { User, LogOut } from 'lucide-react'; // Importei ícones para padronizar

export function UserMenu() {
    const navigate = useNavigate();

    const handleMeusDados = () => {
        navigate("/meus-dados");
    };

    const handleSair = () => {
        // Implemente aqui a lógica de logout (limpar token/sessão)
        navigate("/");
    };

    return (
        <div className={styles.userMenu}>
            <p className={styles.menuItem} onClick={handleMeusDados}>
                <User size={18} /> Meus dados
            </p>
            <p className={`${styles.menuItem} ${styles.logoutItem}`} onClick={handleSair}>
                <LogOut size={18} /> Sair
            </p>
        </div>
    );
}