import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';

import { ISigninForm } from 'types/account';

import request from 'utils/axios';

import styles from './styles.module.scss';

export default function SigninContainer() {
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState<ISigninForm>({ account: '', password: '' });

    const onChangeLoginForm = (key: keyof ISigninForm, value: string) => {
        setLoginForm((prev) => ({ ...prev, [key]: value }));
    };

    const onClickFindButton = () => {
        navigate('/find');
    };

    const onClickLoginButton = async () => {
        try {
            const res = await request('POST', '/v1/hosts/sign-in', loginForm);
            alert('로그인 되었습니다!');
            localStorage.setItem('id', res.id);
            localStorage.setItem('name', res.name);
            navigate('/');
        } catch (e) {
            if (isAxiosError(e) && e.response) alert(e.response.data.message);
            else alert('알 수 없는 에러가 발생했습니다.');
        }
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onClickLoginButton();
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>LOG IN</h2>
            <div className={styles.inputArea}>
                <input
                    value={loginForm.account}
                    placeholder="ID"
                    onKeyDown={onKeyDown}
                    onChange={(e) => onChangeLoginForm('account', e.target.value)}
                />
                <input
                    type="password"
                    value={loginForm.password}
                    placeholder="Password"
                    onKeyDown={onKeyDown}
                    onChange={(e) => onChangeLoginForm('password', e.target.value)}
                />
            </div>
            <div className={styles.buttonArea}>
                <button className={styles.findButton} onClick={onClickFindButton}>
                    Forgot ID/Password
                </button>
                <button className={styles.submitButton} onClick={onClickLoginButton}>
                    Log in
                </button>
            </div>
        </div>
    );
}
