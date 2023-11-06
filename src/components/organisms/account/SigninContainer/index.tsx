import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ILoginForm } from 'types/login';

import request from 'utils/axios';

import styles from './styles.module.scss';

export default function SigninContainer() {
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState<ILoginForm>({ account: '', password: '' });

    const onChangeLoginForm = (key: keyof ILoginForm, value: string) => {
        setLoginForm((prev) => ({ ...prev, [key]: value }));
    };

    const onClickFindButton = () => {
        navigate('/find');
    };

    const onClickLoginButton = async () => {
        try {
            const login = await request('POST', '/v1/sign-in', loginForm);
            console.log(login);
        } catch (e) {
            console.error(e);
            alert(e.response.message);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>LOG IN</h2>
            <div className={styles.inputArea}>
                <input
                    value={loginForm.account}
                    placeholder="ID"
                    onChange={(e) => onChangeLoginForm('account', e.target.value)}
                />
                <input
                    value={loginForm.password}
                    placeholder="Password"
                    onChange={(e) => onChangeLoginForm('password', e.target.value)}
                />
            </div>
            <div className={styles.buttonArea}>
                <button type="button" className={styles.findButton} onClick={onClickFindButton}>
                    Forgot ID/Password
                </button>
                <button type="button" className={styles.submitButton} onClick={onClickLoginButton}>
                    Log in
                </button>
            </div>
        </div>
    );
}
