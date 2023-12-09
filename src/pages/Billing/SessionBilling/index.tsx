import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { isAxiosError } from 'axios';

import PaginationComponent from 'components/organisms/Common/Pagination';

import request from 'utils/axios';
import { dateForm } from 'utils/dateForm';

import styles from './styles.module.scss';

interface IBilling {
    id: string;
    cost: number;
    status: string;
    createdAt: string;
}

export default function SessionBilling() {
    const { id } = useParams();
    const location = useLocation();
    const hostid = localStorage.getItem('id');

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);
    const [firstView, setFirstView] = useState<boolean>(true);

    const [billingList, setBillingList] = useState<IBilling[]>([]);

    const params = new URLSearchParams(location.search);
    const startAt = params.get('startAt');
    const endAt = params.get('endAt');

    useEffect(() => {
        const getBillingList = async () => {
            try {
                const res = await request(
                    'GET',
                    `/v1/hosts/${hostid}/applications/${id}/billings?page=${currentPage}&size=15&firstView=${firstView}&startAt=${startAt}&endAt=${endAt}`
                );

                if (res.pageCount) setPageCount(res.pageCount);
                setBillingList(res.data);
            } catch (e) {
                if (isAxiosError(e)) alert(e.response?.data.message);
            }
        };

        getBillingList();
    }, [currentPage]);

    return (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr>
                        <th>sessionId</th>
                        <th>cost</th>
                        <th>createdAt</th>
                    </tr>
                </thead>
                <tbody>
                    {billingList.map((item) => (
                        <tr>
                            <td>{item.id}</td>
                            <td>{`${item.cost.toFixed(2)} $`}</td>
                            <td>{dateForm(item.createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <PaginationComponent
                currentPage={currentPage}
                pageCount={pageCount}
                setPage={setCurrentPage}
                setFirstView={setFirstView}
            />
        </div>
    );
}
