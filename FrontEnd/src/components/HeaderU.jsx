import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './style/HeaderU.module.css';
import controlafacilIcone from '../assets/icone.controlafacil.png';
import { User, Bell } from 'lucide-react';
import { UserMenu } from './UserMenu';

export function HeaderU() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu() {
        setIsMenuOpen(prev => !prev);
    }
    
    // Função auxiliar para aplicar as classes CSS Modules
    const getNavLinkClass = ({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`;

    return (
        <header className={styles.header}>
            <NavLink to="/home" className={styles.logoLink}>
                <div className={styles.logo}>
                    <img src={controlafacilIcone} alt="Controla Fácil Logo" className={styles.logoImg} />
                    <span className={styles.logoText}>Controla Fácil</span>
                </div>
            </NavLink>

            <nav className={styles.nav}>
                {/* Usando 'end' para forçar a correspondência exata, resolvendo o problema de seleção */}
                <NavLink 
                    to="/home" 
                    className={getNavLinkClass}
                    end
                >
                    Dashboard
                </NavLink>
                
                <NavLink 
                    to="/cadastro-produto"
                    className={getNavLinkClass}
                    end
                >
                    Cadastrar Produto
                </NavLink>
                
                <NavLink 
                    to="/estoque"
                    className={getNavLinkClass}
                    end
                >
                    Estoque
                </NavLink>
                
                <NavLink 
                    to="/relatorios" // Alterado para uma rota válida, assumindo que existe /relatorios
                    className={getNavLinkClass}
                    end
                >
                    Relatórios
                </NavLink>
                
                <NavLink 
                    to="/parceiros"
                    className={getNavLinkClass}
                    end
                >
                    Parceiros
                </NavLink>
                
                <NavLink 
                    to="/cadastro-parceiro"
                    className={getNavLinkClass}
                    end
                >
                    Cadastrar Parceiro
                </NavLink>
            </nav>

            <div className={styles.userProfile}>
                <Bell size={20} className={styles.notificationIcon} />
                <span className={styles.userName}>Olá, Admin!</span>
                <div className={styles.userWrapper}>
                    <User size={24} className={styles.userIcon} onClick={toggleMenu} />
                    {isMenuOpen && <UserMenu />}
                </div>
            </div>
        </header>
    );
}