import React, { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';

import PaginationComponent from 'components/organisms/Common/Pagination';

import request from 'utils/axios';

import styles from './styles.module.scss';

const id = window.localStorage.getItem('id');

export default function Question() {
    const [errorList, setErrorList] = useState<unknown[]>([]);

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);
    const [firstView, setFirstView] = useState<boolean>(true);

    const getErrorList = async (isFirstView: boolean) => {
        try {
            const res = await request(
                'GET',
                `/v1/hosts/${id}/errors?page=${currentPage}&size=15&firstView=${isFirstView}&sort[name]=createdAt&sort[option]=ASC`
            );

            setErrorList(res.data);
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
                <button>Add Question +</button>
            </div>
            <div className={styles.container}>
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
