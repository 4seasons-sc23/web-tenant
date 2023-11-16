import { IApplication } from 'types/application';

import { dateForm } from 'utils/dateForm';
import { useDeleteApplication, usePatchApplication } from 'utils/query/useApplicationQuery';

import styles from './styles.module.scss';

interface Props {
    applicationList: IApplication[];
}

export default function ApplicationTable({ applicationList }: Props) {
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
                        <td>{app.applicationId}</td>
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
                            <button>{app.status === 'N' ? '활성화' : '비활성화'}</button>
                        </td>
                        <td>{JSON.stringify(app.session)}</td>
                        <td>{app.type}</td>
                        <td>
                            <button
                                onClick={() =>
                                    deleteApp({ appId: app.applicationId, apiKey: app.apiKey })
                                }
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
