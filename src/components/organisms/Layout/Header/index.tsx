import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';

export default function Header() {
    const navigate = useNavigate();

    const userNickname = '1';

    const onClickSigninButton = () => {
        navigate('/signin');
    };

    const onClickSignupButton = () => {
        navigate('/signup');
    };

    return (
        <div className={styles.header}>
            <div className={styles.header_logo}>
                <h2>IN-STREAM</h2>
            </div>
            <div>
                {!userNickname ? (
                    <div className={styles.header_info_user}>{userNickname}</div>
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
