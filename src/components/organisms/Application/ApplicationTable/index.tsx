/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useNavigate } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { FaRegCopy } from 'react-icons/fa';

import { IApplication } from 'types/application';

import { dateForm } from 'utils/dateForm';

import styles from './styles.module.scss';

interface Props {
    applicationList: IApplication[];
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

export default function ApplicationTable({ applicationList, currentPage, setCurrentPage }: Props) {
    const navigate = useNavigate();

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>apiKey</th>
                    <th></th>
                    <th>applicationId</th>
                    <th></th>
                    <th>createAt</th>
                    <th>status</th>
                    {/* <th>session</th> */}
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
                                onClick={() => {}}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
