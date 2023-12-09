/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [showHowToUse, setShowHowToUse] = useState(false);

    const handleHowToUseClick = () => {
        setShowHowToUse(!showHowToUse);
    };

    useEffect(() => {
        setShowHowToUse(window.location.href.includes('docs'));
    }, [location]);

    return (
        <div className={styles.sidebar}>
            <div className={styles.menuContainer}>
                <ul>
                    <li
                        className={styles.menu}
                        onClick={() => {
                            navigate('/application');
                        }}
                    >
                        <div className="menu-title">
                            <span>Application</span>
                        </div>
                    </li>
                    <li
                        className={styles.menu}
                        onClick={() => {
                            navigate('/question');
                        }}
                    >
                        <div className="menu-title">
                            <span>Inquiry</span>
                        </div>
                    </li>
                    <li
                        className={styles.menu}
                        onClick={() => {
                            navigate('/billing');
                        }}
                    >
                        <div>
                            <span>Billing</span>
                        </div>
                    </li>
                    <li className={styles.menu}>
                        <div>
                            <a
                                href="https://4seasons-sc23.github.io/instream-docs/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Docs
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
