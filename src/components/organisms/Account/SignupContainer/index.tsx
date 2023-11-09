import { useState } from 'react';

import { ISignupForm } from 'types/account';

import request from 'utils/axios';

import styles from './styles.module.scss';

export default function SignupContainer() {
    const [signupForm, setSignupForm] = useState<ISignupForm>({
        account: '',
        password: '',
        name: '',
        phoneNumber: '',
    });

    const onChangeLoginForm = (key: keyof ISignupForm, value: string) => {
        setSignupForm((prev) => ({ ...prev, [key]: value }));
    };

    const onClickSignupButton = async () => {
        try {
            const signup = await request('POST', '/v1/sign-up', signupForm);
            console.log(signup);
        } catch (e) {
            console.error(e);
            alert(e.response.message);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Sign up</h2>
            <div className={styles.inputArea}>
                <input
                    value={signupForm.account}
                    placeholder="ID"
                    onChange={(e) => onChangeLoginForm('account', e.target.value)}
                />
                <input
                    value={signupForm.password}
                    placeholder="Password"
                    onChange={(e) => onChangeLoginForm('password', e.target.value)}
                />
                <input
                    // value={signupForm.password}
                    placeholder="Confirm Password"
                    // onChange={(e) => onChangeLoginForm('password', e.target.value)}
                />
                <input
                    value={signupForm.name}
                    placeholder="Name"
                    onChange={(e) => onChangeLoginForm('name', e.target.value)}
                />
                <input
                    value={signupForm.phoneNumber}
                    placeholder="PhoneNumber (ex. 010-0000-0000)"
                    onChange={(e) => onChangeLoginForm('phoneNumber', e.target.value)}
                />
            </div>
            <div className={styles.buttonArea}>
                <button className={styles.submitButton} onClick={onClickSignupButton}>
                    Sign up
                </button>
            </div>
        </div>
    );
}
