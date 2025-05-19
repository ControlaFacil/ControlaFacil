import { useState } from 'react';
import styles from './style/HeaderU.module.css'
import controlafacilIcone from '../assets/icone.controlafacil.pNg'
import { User, Menu } from 'lucide-react';
import { UserMenu } from './UserMenu';

export function HeaderU() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu() {
        setIsMenuOpen(prev => !prev);
    }

    return (
        <div>
            <header className={styles.header}>
                <Menu className={styles.menu} />
                <img src={controlafacilIcone} alt="Icone Controla Fácil" />
                <div className={styles.userArea}>
                    <User className={styles.user} onClick={toggleMenu} />
                    {isMenuOpen && <UserMenu />}
                </div>
            </header>
        </div>
    )
}
