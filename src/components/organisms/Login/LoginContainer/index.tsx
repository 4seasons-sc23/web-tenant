import { useState } from 'react';

import styles from './styles.module.scss';

interface ILoginForm {
    id: string;
    pw: string;
}

export default function LoginContainer() {
    const [loginForm, setLoginForm] = useState<ILoginForm>({ id: '', pw: '' });

    const onChangeLoginForm = (id: string, text: string) => {
        setLoginForm({ ...loginForm, [id]: text });
    };

    return (
        <div className={styles.container}>
            <div>
                <span>ID</span>
                <input
                    id="id"
                    value={loginForm.id}
                    placeholder="id를 입력해주세요"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onChangeLoginForm('id', e.target.value);
                    }}
                />
            </div>
            <div>
                <span>PW</span>
                <input
                    id="pw"
                    value={loginForm.pw}
                    placeholder="비밀번호를 입력해주세요"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onChangeLoginForm('pw', e.target.value);
                    }}
                />
            </div>
            <button type="button" onClick={() => console.log(loginForm)}>
                login
            </button>
        </div>
    );
}
