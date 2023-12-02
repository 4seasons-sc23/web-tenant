import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';

import PaginationComponent from 'components/organisms/Common/Pagination';

import request from 'utils/axios';
import { dateForm } from 'utils/dateForm';

import styles from './styles.module.scss';

const id = window.localStorage.getItem('id');

interface IError {
    errorId: number;
    tenantId: string;
    title: string;
    content: string;
    isAnswered: 'N' | 'Y';
    status: 'N' | 'Y';
    createdAt: string;
}

export default function Question() {
    const navigate = useNavigate();

    const [errorList, setErrorList] = useState<IError[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);
    const [firstView, setFirstView] = useState<boolean>(true);

    const getErrorList = async (isFirstView: boolean) => {
        try {
            const res = await request(
                'GET',
                `/v1/hosts/${id}/errors?page=${currentPage}&size=15&firstView=${isFirstView}`
            );

            setErrorList(res.data);
            if (res.pageCount) setPageCount(res.pageCount);
        } catch (e) {
            if (isAxiosError(e)) alert(e.response?.data.message);
        }
    };

    useEffect(() => {
        getErrorList(firstView);
    }, [currentPage]);

    return (
        <>
            <div className={styles.buttonArea}>
                <button onClick={() => navigate('/question/post')}>Add Question +</button>
            </div>
            <div className={styles.container}>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>title</th>
                            <th>답변등록여부</th>
                            <th>작성일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {errorList.map((error) => (
                            <tr>
                                <td style={{ width: '5%' }}>{error.errorId}</td>
                                <td>{error.title}</td>
                                <td style={{ width: '10%' }}>
                                    {error.isAnswered === 'Y' ? '완료' : '답변진행중'}
                                </td>
                                <td style={{ width: '15%' }}>{dateForm(error.createdAt)}</td>
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
            </div>
        </>
    );
}
