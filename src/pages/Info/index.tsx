import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

import request from 'utils/axios';

import styles from './styles.module.scss';

interface IInfo {
    id: string;
    account: string;
    name: string;
    phoneNumber: string;
    status: string;
    session: string;
}

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.{7,})/;

export default function TenantInfo() {
    const id = window.localStorage.getItem('id');

    const [infoData, setInfoData] = useState<IInfo>({
        id: '',
        account: '',
        name: '',
        phoneNumber: '',
        status: '',
        session: '',
    });

    const [name, setName] = useState<string>('');
    const [isEditName, setIsEditName] = useState<boolean>(false);

    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordMatch, setIsPasswordMatch] = useState(false);
    const [isEditPassword, setIsEditPassword] = useState<boolean>(false);

    const getInfoData = async () => {
        try {
            const res = await request('GET', `/v1/hosts/${id}/info`);
            setInfoData(res);
            setName(res.name);
        } catch (e) {
            if (isAxiosError(e)) alert(e.response?.data.message);
        }
    };

    const patchName = async () => {
        try {
            await request('PATCH', `/v1/hosts/${id}/name`, { name });
            alert('수정되었습니다!');
            getInfoData();
            localStorage.setItem('name', name);
            window.location.reload();
        } catch (e) {
            if (isAxiosError(e)) alert(e.response?.data.message);
        }
    };

    const deleteTenant = async () => {
        if (window.confirm('정말 탈퇴하시겠습니까 ?')) {
            try {
                await request('PATCH', `/v1/hosts/${id}/withdrawal`);
                alert('탈퇴되었습니다.');
                window.localStorage.removeItem('id');
                window.localStorage.removeItem('name');
                window.location.href = '/';
            } catch (e) {
                if (isAxiosError(e)) alert(e.response?.data.message);
            }
        }
    };

    const patchPassword = async () => {
        if (window.confirm('변경하시겠습니까?')) {
            try {
                await request('PATCH', `/v1/hosts/${id}/password`, {
                    currentPassword,
                    newPassword: password,
                });
                alert('비밀번호가 변경되었습니다. 다시 로그인해주세요');
                window.localStorage.removeItem('id');
                window.localStorage.removeItem('name');
                window.location.href = '/signin';
            } catch (e) {
                if (isAxiosError(e)) alert(e.response?.data.message);
            }
        }
    };

    useEffect(() => {
        getInfoData();
    }, []);

    useEffect(() => {
        setIsPasswordValid(passwordRegex.test(password));
        setIsPasswordMatch(password === confirmPassword);
    }, [password, confirmPassword]);

    return (
        <>
            <div className={styles.container}>
                <h1>기본 정보</h1>
                <div className={styles.text}>
                    <strong>account:</strong>
                    <span>{infoData.account}</span>
                </div>
                <div className={styles.text}>
                    <div className={styles.text}>
                        <strong>name: </strong>
                        {isEditName ? (
                            <input value={name} onChange={(e) => setName(e.target.value)} />
                        ) : (
                            <span>{name}</span>
                        )}
                    </div>
                    <button
                        onClick={() => {
                            setIsEditName((prev) => !prev);
                            if (isEditName) patchName();
                        }}
                    >
                        {isEditName ? '완료' : '수정'}
                    </button>
                </div>

                <div className={styles.text}>
                    <div className={styles.text}>
                        <strong>id: </strong>
                        <span>{infoData.id}</span>
                    </div>
                    <button
                        onClick={async () => {
                            await navigator.clipboard.writeText(infoData.id);
                            alert('클립보드에 복사되었습니다!');
                        }}
                    >
                        복사
                    </button>
                </div>
                <div className={styles.text}>
                    <strong>phoneNumber: </strong>
                    <span>{infoData.phoneNumber}</span>
                </div>
                <div className={styles.text}>
                    <button onClick={() => setIsEditPassword((prev) => !prev)}>
                        비밀번호 변경
                    </button>
                    <button onClick={deleteTenant}>회원 탈퇴</button>
                </div>
            </div>
            {isEditPassword && (
                <div style={{ marginTop: '20px' }} className={styles.container}>
                    <h1>비밀번호 변경</h1>
                    <div>
                        <div className={styles.pwBox}>
                            <span>현재 비밀번호</span>
                            <input
                                type="password"
                                value={currentPassword}
                                placeholder="current Password"
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>
                        <div className={styles.pwBox}>
                            <span>새 비밀번호</span>
                            <input
                                type="password"
                                value={password}
                                placeholder="new Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {password && !isPasswordValid && (
                                <span className={styles.errMsg}>
                                    비밀번호는 대문자, 소문자, 특수기호를 포함하며 7자 이상이어야
                                    합니다.
                                </span>
                            )}
                        </div>
                        <div className={styles.pwBox}>
                            <span>비밀번호 확인</span>
                            <input
                                type="password"
                                value={confirmPassword}
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {confirmPassword && !isPasswordMatch && (
                                <span className={styles.errMsg}>
                                    확인 비밀번호가 일치하지 않습니다.
                                </span>
                            )}
                        </div>
                        <button style={{ marginTop: 20 }} onClick={patchPassword}>
                            변경
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
