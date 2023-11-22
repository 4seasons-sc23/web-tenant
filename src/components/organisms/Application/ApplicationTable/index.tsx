import { useNavigate } from 'react-router-dom';

import { IApplication } from 'types/application';

import { dateForm } from 'utils/dateForm';
import { sessionStatus } from 'utils/sessionStatus';
import { useDeleteApplication, usePatchApplication } from 'utils/query/useApplicationQuery';

import styles from './styles.module.scss';

interface Props {
    applicationList: IApplication[];
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

export default function ApplicationTable({ applicationList, currentPage, setCurrentPage }: Props) {
    const navigate = useNavigate();

    const { mutate: deleteApp, isLoading } = useDeleteApplication();
    const { mutate: patchApp } = usePatchApplication();

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>apiKey</th>
                    <th>applicationId</th>
                    <th>createAt</th>
                    <th>status</th>
                    <th>session</th>
                    <th>type</th>
                    <th>delete</th>
                </tr>
            </thead>
            <tbody>
                {applicationList.map((app) => (
                    <tr key={app.applicationId}>
                        <td>{app.apiKey}</td>
                        <td
                            onClick={() => {
                                navigate({
                                    pathname: '/session',
                                    search: `?apiKey=${app.apiKey}&applicationId=${app.applicationId}`,
                                });
                            }}
                        >
                            {app.applicationId}
                        </td>
                        <td>{dateForm(app.createdAt)}</td>
                        <td
                            onClick={() =>
                                patchApp({
                                    appId: app.applicationId,
                                    apiKey: app.apiKey,
                                    status: app.status,
                                })
                            }
                        >
                            <button>{app.status !== 'N' ? '활성화' : '비활성화'}</button>
                        </td>
                        <td>{sessionStatus(app.session)}</td>
                        <td>{app.type}</td>
                        <td>
                            <button
                                onClick={() => {
                                    deleteApp({ appId: app.applicationId, apiKey: app.apiKey });
                                    if (currentPage > 0 && applicationList.length === 1) {
                                        setCurrentPage(currentPage - 1);
                                    }
                                }}
                                disabled={isLoading || app.status === 'F'}
                            >
                                삭제
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
