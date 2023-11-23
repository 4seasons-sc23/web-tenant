/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaRegCopy } from 'react-icons/fa';

import PaginationComponent from 'components/organisms/Common/Pagination';

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

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);

    const apiKey = params.get('apiKey');
    const applicationId = params.get('applicationId');

    const [sessionsList, setSessionsList] = useState<ISession[]>([]);

    useEffect(() => {
        const getSessionsList = async () => {
            try {
                const res = await request(
                    'GET',
                    `/v1/hosts/${id}/applications/${applicationId}/sessions?page=${currentPage}&size=15&firstView=true`,
                    null,
                    { ApiKey: apiKey }
                );
                setPageCount(res.pageCount);
                setSessionsList(res.data);
            } catch (e) {
                if (isAxiosError(e)) alert(e.response?.data.message);
            }
        };

        getSessionsList();
    }, [currentPage]);

    return (
        <div className={styles.container}>
            {sessionsList.length !== 0 ? (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>sessionId</th>
                                <th></th>
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
                                    <td style={{ width: '3%' }}>
                                        <FaRegCopy
                                            style={{ cursor: 'pointer' }}
                                            onClick={async () => {
                                                await navigator.clipboard.writeText(session.id);
                                                alert('클립보드에 복사되었습니다!');
                                            }}
                                        />
                                    </td>
                                    <td>{dateForm(session.createdAt)}</td>
                                    <td>{dateForm(session.deletedAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <PaginationComponent
                        currentPage={currentPage}
                        setPage={setCurrentPage}
                        pageCount={pageCount}
                    />
                </>
            ) : (
                <div>생성된 세션이 없습니다.</div>
            )}
        </div>
    );
}
