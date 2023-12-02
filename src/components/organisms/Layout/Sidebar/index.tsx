/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

export default function Sidebar() {
    const navigate = useNavigate();

    return (
        <div className={styles.sidebar}>
            <div className={styles.menuContainer}>
                <ul
                    className={styles.menu}
                    onClick={() => {
                        navigate('/application');
                    }}
                >
                    <li className="menu-item">
                        <div className="menu-title">
                            <span>Application</span>
                        </div>
                    </li>
                </ul>
                <ul
                    className={styles.menu}
                    onClick={() => {
                        navigate('/question');
                    }}
                >
                    <li className="menu-item">
                        <div className="menu-title">
                            <span>Question</span>
                        </div>
                    </li>
                </ul>
                <ul
                    className={styles.menu}
                    onClick={() => {
                        navigate('/billing');
                    }}
                >
                    <li className="menu-item">
                        <div className="menu-title">
                            <span>Billing</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
