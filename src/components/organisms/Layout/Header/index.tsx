import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

export default function Header() {
    const navigate = useNavigate();

    const name = localStorage.getItem('name');

    const onClickLogo = () => {
        navigate('/');
    };

    const onClickSigninButton = () => {
        navigate('/signin');
    };

    const onClickSignupButton = () => {
        navigate('/signup');
    };

    const onClickLogoutButton = () => {
        if (window.confirm('정말 로그아웃 하시겠습니까 ?')) {
            localStorage.removeItem('id');
            localStorage.removeItem('name');
            window.location.href = '/';
        }
    };

    return (
        <div className={styles.header}>
            <div onClick={onClickLogo} className={styles.header_logo}>
                <h2>IN-STREAM</h2>
            </div>
            <div>
                {name ? (
                    <div className={styles.buttonArea}>
                        <div style={{ cursor: 'pointer' }} onClick={() => navigate('/info')}>
                            {name}
                        </div>
                        <div className={styles.divider} />
                        <button onClick={onClickLogoutButton} className={styles.button}>
                            Log out
                        </button>
                    </div>
                ) : (
                    <div className={styles.buttonArea}>
                        <button onClick={onClickSigninButton} className={styles.button}>
                            Sign in
                        </button>
                        <div className={styles.divider} />
                        <button onClick={onClickSignupButton} className={styles.button}>
                            Sign up
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
