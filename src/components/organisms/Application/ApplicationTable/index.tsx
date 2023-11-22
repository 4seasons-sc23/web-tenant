/* eslint-disable jsx-a11y/control-has-associated-label */
import { useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

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
                    {/* <th>session</th> */}
                    <th>type</th>
                    <th>delete</th>
                </tr>
            </thead>
            <tbody>
                {applicationList.map((app) => (
                    <tr key={app.applicationId}>
                        <td>{app.apiKey}</td>
                        <td
                            style={{ cursor: 'pointer' }}
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
                            <button className={`${app.status === 'N' ? styles.on : styles.off}`}>
                                {app.status === 'N' ? 'ON' : 'OFF'}
                            </button>
                        </td>
                        {/* <td>{sessionStatus(app.session)}</td> */}
                        <td>{app.type}</td>
                        <td>
                            <FiTrash2
                                style={{ cursor: 'pointer' }}
                                color="#3e3582"
                                onClick={() => {
                                    if (!(isLoading || app.status === 'F')) {
                                        if (window.confirm('레알루다가 삭제할꺼얌 ?? >__<')) {
                                            deleteApp({
                                                appId: app.applicationId,
                                                apiKey: app.apiKey,
                                            });
                                            if (currentPage > 0 && applicationList.length === 1) {
                                                setCurrentPage(currentPage - 1);
                                            }
                                        }
                                    }
                                }}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
