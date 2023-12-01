/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { FaRegCopy } from 'react-icons/fa';
import { isAxiosError } from 'axios';

import { IApplication } from 'types/application';

import request from 'utils/axios';
import { dateForm } from 'utils/dateForm';

import styles from './styles.module.scss';

interface Props {
    applicationList: IApplication[];
    getApplicationList: (isFirstView: boolean) => Promise<void>;
}

export default function ApplicationTable({
    applicationList,

    getApplicationList,
}: Props) {
    const navigate = useNavigate();

    const onClickDeleteApplication = (applicationId: string, ApiKey: string) => async () => {
        const headers = { ApiKey };
        try {
            await request('DELETE', `/v1/applications/${applicationId}`, null, headers);

            getApplicationList(true);
        } catch (e) {
            if (isAxiosError(e)) alert(e.response?.data.message);
        }
    };

    const onClickStatusButton =
        (status: 'N' | 'P' | 'F', applicationId: string, ApiKey: string) => async () => {
            const headers = { ApiKey };

            try {
                await request(
                    'PATCH',
                    `/v1/applications/${applicationId}/${status === 'N' ? 'end' : 'start'}`,
                    undefined,
                    headers
                );

                getApplicationList(false);
            } catch (e) {
                if (isAxiosError(e)) alert(e.response?.data.message);
            }
        };

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>apiKey</th>
                    <th />
                    <th>applicationId</th>
                    <th />
                    <th>createAt</th>
                    <th>status</th>
                    <th>type</th>
                    <th>delete</th>
                </tr>
            </thead>
            <tbody>
                {applicationList.map((app) => (
                    <tr key={app.id}>
                        <td>{app.apiKey}</td>
                        <td style={{ width: '3%' }}>
                            <FaRegCopy
                                style={{ cursor: 'pointer' }}
                                onClick={async () => {
                                    await navigator.clipboard.writeText(app.apiKey);
                                    alert('클립보드에 복사되었습니다!');
                                }}
                            />
                        </td>
                        <td
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                navigate({
                                    pathname: '/session',
                                    search: `?apiKey=${app.apiKey}&id=${app.id}`,
                                });
                            }}
                        >
                            {app.id}
                        </td>
                        <td style={{ width: '3%' }}>
                            <FaRegCopy
                                style={{ cursor: 'pointer' }}
                                onClick={async () => {
                                    await navigator.clipboard.writeText(app.id);
                                    alert('클립보드에 복사되었습니다!');
                                }}
                            />
                        </td>
                        <td>{dateForm(app.createdAt)}</td>
                        <td>
                            <button
                                onClick={onClickStatusButton(app.status, app.id, app.apiKey)}
                                className={`${app.status === 'N' ? styles.on : styles.off}`}
                            >
                                {app.status === 'N' ? 'ON' : 'OFF'}
                            </button>
                        </td>
                        <td>{app.type}</td>
                        <td>
                            <FiTrash2
                                style={{ cursor: 'pointer' }}
                                color="#3e3582"
                                onClick={onClickDeleteApplication(app.id, app.apiKey)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
