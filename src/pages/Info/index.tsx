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

    useEffect(() => {
        const getInfoData = async () => {
            try {
                const res = await request('GET', `/v1/hosts/${id}/info`);
                setInfoData(res);
            } catch (e) {
                if (isAxiosError(e)) alert(e.response?.data.message);
            }
        };

        getInfoData();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.text}>
                <strong>account:</strong>
                <span>{infoData.account}</span>
            </div>
            <div className={styles.text}>
                <strong>name: </strong>
                <span>{infoData.name}</span>
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
        </div>
    );
}
