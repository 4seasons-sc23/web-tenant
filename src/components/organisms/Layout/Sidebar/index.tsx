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
                            <span>Question</span>
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
                    <li className={styles.menu} onClick={handleHowToUseClick}>
                        <div>
                            <span>How To Use</span>
                        </div>
                        {showHowToUse && (
                            <ul>
                                <li onClick={() => navigate('/docs/sdk-docs')}>1. SDK DOCS</li>
                                <li onClick={() => navigate('/docs/api-docs')}>2. API DOCS</li>
                                <li onClick={() => navigate('/docs/billing')}>3. 요금 정책</li>
                                <li onClick={() => navigate('/docs/obs-guide')}>
                                    4. OBS스튜디오 가이드
                                </li>
                                <li onClick={() => navigate('/docs/description')}>5. 용어 정의</li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
}
