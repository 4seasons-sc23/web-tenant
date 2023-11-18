import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

import request from 'utils/axios';

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
        <div>
            <div>{`account: ${infoData.account}`}</div>
            <div>{`name: ${infoData.name}`}</div>
            <div>{`phoneNumber: ${infoData.phoneNumber}`}</div>
            <div>{`status: ${infoData.status}`}</div>
        </div>
    );
}
