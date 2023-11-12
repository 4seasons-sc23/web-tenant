import { useState } from 'react';
import { isAxiosError } from 'axios';

import { ISignupForm } from 'types/account';

import request from 'utils/axios';

import styles from './styles.module.scss';

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.{7,})/;

export default function SignupContainer() {
    const [signupForm, setSignupForm] = useState<ISignupForm>({
        account: '',
        password: '',
        name: '',
        phoneNumber: '',
    });

    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);

    const onChangeLoginForm = (key: keyof ISignupForm, value: string) => {
        setSignupForm((prev) => ({ ...prev, [key]: value }));

        if (key === 'password') {
            setIsPasswordValid(passwordRegex.test(value));
        }
    };

    const onConfirmPasswordChange = (value: string) => {
        setConfirmPassword(value);
        setIsPasswordMatch(value === signupForm.password);
    };

    const onClickSignupButton = async () => {
        if (!isPasswordValid || !isPasswordMatch) {
            alert('입력 정보를 다시 확인해주세요!');
            return;
        }

        try {
            const signup = await request('POST', '/v1/hosts/sign-up', signupForm);
            console.log(signup);
        } catch (e) {
            if (isAxiosError(e) && e.response) alert(e.response.data.message);
            else alert('알 수 없는 에러가 발생했습니다.');
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
                <div className={styles.inputContainer}>
                    <input
                        type="password"
                        value={signupForm.password}
                        placeholder="Password"
                        onChange={(e) => onChangeLoginForm('password', e.target.value)}
                    />
                    {signupForm.password && !isPasswordValid && (
                        <span className={styles.errMsg}>
                            비밀번호는 대문자, 소문자, 특수기호를 포함하며 7자 이상이어야 합니다.
                        </span>
                    )}
                </div>
                <div className={styles.inputContainer}>
                    <input
                        type="password"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                        onChange={(e) => onConfirmPasswordChange(e.target.value)}
                    />
                    {confirmPassword && !isPasswordMatch && (
                        <span className={styles.errMsg}>확인 비밀번호가 일치하지 않습니다.</span>
                    )}
                </div>
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
