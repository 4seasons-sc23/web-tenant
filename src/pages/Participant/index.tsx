import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import PaginationComponent from 'components/organisms/Common/Pagination';

import request from 'utils/axios';
import { dateForm } from 'utils/dateForm';

import styles from './styles.module.scss';

interface IParticipant {
    id: string;
    createdAt: string;
    updatedAt: string;
    participant: {
        id: string;
        nickname: string;
        profileImgUrl: string;
        createdAt: string;
    };
    session: {
        createdAt: string;
        deletedAt: string | null;
    };
    application: string | null;
}

export default function Participant() {
    const id = window.localStorage.getItem('id');

    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const apiKey = params.get('apiKey');
    const sessionId = params.get('sessionId');

    const [participantList, setParticipantList] = useState<IParticipant[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);

    useEffect(() => {
        const getParticipantList = async () => {
            try {
                const res = await request(
                    'GET',
                    `/v1/hosts/${id}/applications/sessions/${sessionId}/participants?page=0&size=15&firstView=true`,
                    null,
                    { ApiKey: apiKey }
                );

                setParticipantList(res.data);
                setPageCount(res.pageCount);
            } catch (e) {
                if (isAxiosError(e)) alert(e.response?.data.message);
            }
        };

        getParticipantList();
    }, []);

    return (
        <div className={styles.container}>
            {participantList.length !== 0 ? (
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>status</th>
                                <th>nickname</th>
                                <th>createdAt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participantList.map((participant) => (
                                <tr>
                                    <td>{participant.updatedAt ? 'leave' : 'enter'}</td>
                                    <td>{participant.participant.nickname}</td>
                                    <td>{dateForm(participant.createdAt)}</td>
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
                <div>시청자가 없습니다.</div>
            )}
        </div>
    );
}
