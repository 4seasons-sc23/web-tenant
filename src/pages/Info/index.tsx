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

    useEffect(() => {
        getInfoData();
    }, []);

    return (
        <div className={styles.container}>
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
            <div>
                <button onClick={deleteTenant}>회원 탈퇴</button>
            </div>
        </div>
    );
}
