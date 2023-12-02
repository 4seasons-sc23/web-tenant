import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

export default function Sidebar() {
    const navigate = useNavigate();

    return (
        <div className={styles.sidebar}>
            <div className={styles.menuContainer}>
                <ul className={styles.menu}>
                    <li className="menu-item">
                        <div
                            className="menu-title"
                            onClick={() => {
                                navigate('/application');
                            }}
                        >
                            <span>Application</span>
                        </div>
                    </li>
                </ul>
                <ul className={styles.menu}>
                    <li className="menu-item">
                        <div
                            className="menu-title"
                            onClick={() => {
                                navigate('/question');
                            }}
                        >
                            <span>Question</span>
                        </div>
                    </li>
                </ul>
                <ul className={styles.menu}>
                    <li className="menu-item">
                        <div
                            className="menu-title"
                            onClick={() => {
                                navigate('/billing');
                            }}
                        >
                            <span>Billing</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
