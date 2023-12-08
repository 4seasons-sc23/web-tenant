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

    // eslint-disable-next-line consistent-return
    useEffect(() => {
        if (!window.localStorage.getItem('id')) {
            alert('로그인 이후 사용 가능합니다.');
            return navigate('/signin');
        }

        getErrorList(firstView);
    }, [currentPage]);

    return (
        <>
            <div className={styles.buttonArea}>
                <button onClick={() => navigate('/question/post/0')}>Add Question +</button>
            </div>
            <div className={styles.container}>
                {errorList.length > 0 ? (
                    <>
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
                                        <td
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => navigate(`/question/${error.errorId}`)}
                                        >
                                            {error.title}
                                        </td>
                                        <td style={{ width: '10%' }}>
                                            {error.isAnswered === 'Y' ? '답변완료' : '답변대기중'}
                                        </td>
                                        <td style={{ width: '15%' }}>
                                            {dateForm(error.createdAt)}
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
                    <div>작성하신 문의사항이 없습니다.</div>
                )}
            </div>
        </>
    );
}
