import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import request from 'utils/axios';
import { dateForm } from 'utils/dateForm';

import styles from './styles.module.scss';

interface ISession {
    id: string;
    createdAt: string;
    deletedAt: string;
}

export default function Sessions() {
    const navigate = useNavigate();

    const id = window.localStorage.getItem('id');

    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const apiKey = params.get('apiKey');
    const applicationId = params.get('applicationId');

    const [sessionsList, setSessionsList] = useState<ISession[]>([]);

    useEffect(() => {
        const getSessionsList = async () => {
            try {
                const res = await request(
                    'GET',
                    `/v1/hosts/${id}/applications/${applicationId}/sessions?page=0&size=15&firstView=true`,
                    null,
                    { ApiKey: apiKey }
                );

                setSessionsList(res.data);
            } catch (e) {
                if (isAxiosError(e)) alert(e.response?.data.message);
            }
        };

        getSessionsList();
    }, []);

    return (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        <th>sessionId</th>
                        <th>createdAt</th>
                        <th>deletedAt</th>
                    </tr>
                </thead>
                <tbody>
                    {sessionsList.map((session) => (
                        <tr>
                            <td
                                onClick={() => {
                                    navigate(
                                        `/participant?apiKey=${apiKey}&sessionId=${session.id}`
                                    );
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                {session.id}
                            </td>
                            <td>{dateForm(session.createdAt)}</td>
                            <td>{dateForm(session.deletedAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
