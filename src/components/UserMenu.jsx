import { UserPen, LogOut } from 'lucide-react';
import styles from './style/UserMenu.module.css';

export function UserMenu() {
    return (
        <div className={styles.menu}>
            <button className={styles.item}>
                <UserPen />Editar perfil
            </button>
            <button className={styles.item}>
                <LogOut /> Sair
            </button>
        </div>
    );
}
