/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/control-has-associated-label */
import axios, { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaRegCopy } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';

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

    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);
    const [firstView, setFirstView] = useState<boolean>(true);

    const ApiKey = params.get('ApiKey');
    const applicationId = params.get('applicationId');

    const [sessionsList, setSessionsList] = useState<ISession[]>([]);

    const getSessionsList = async (isFirstView: boolean) => {
        try {
            const res = await request(
                'GET',
                `/v1/applications/${applicationId}/sessions?page=${currentPage}&size=15&firstView=${isFirstView}`,
                null,
                { ApiKey }
            );
            setSessionsList(res.data);

            if (res.pageCount) setPageCount(res.pageCount);
        } catch (e) {
            if (isAxiosError(e)) alert(e.response?.data.message);
        }
    };

    useEffect(() => {
        getSessionsList(firstView);
    }, [currentPage]);

    const onClickAddSession = async () => {
        try {
            await request('PATCH', `/v1/applications/${applicationId}/sessions/start`, null, {
                ApiKey,
            });
            getSessionsList(true);
        } catch (e) {
            if (isAxiosError(e)) alert(e.response?.data.message);
        }
    };

    const onClickDeleteSession = async () => {
        try {
            await request('PATCH', `/v1/applcations/${applicationId}/sessions/end`, null, {
                ApiKey,
            });
        } catch (e) {
            if (isAxiosError(e)) alert(e.response?.data.message);
        }
    };

    return (
        <>
            <div className={styles.buttonArea}>
                <button onClick={onClickAddSession}>
                    <span>Add Session</span>
                    <span>+</span>
                </button>
            </div>
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
                                    <th>delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sessionsList.map((session) => (
                                    <tr>
                                        <td
                                            onClick={() => {
                                                navigate(
                                                    `/participant?ApiKey=${ApiKey}&sessionId=${session.id}`
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
                                        <td>
                                            <FiTrash2
                                                style={{ cursor: 'pointer' }}
                                                color="#3e3582"
                                                // onClick={onClickDeleteApplication(
                                                //     app.id,
                                                //     app.apiKey
                                                // )}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <PaginationComponent
                            currentPage={currentPage}
                            setPage={setCurrentPage}
                            pageCount={pageCount}
                            setFirstView={setFirstView}
                        />
                    </>
                ) : (
                    <div>생성된 세션이 없습니다.</div>
                )}
            </div>
        </>
    );
}
