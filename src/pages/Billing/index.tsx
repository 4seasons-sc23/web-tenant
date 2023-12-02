import React, { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';

import PaginationComponent from 'components/organisms/Common/Pagination';

import request from 'utils/axios';
import { dateForm } from 'utils/dateForm';

import styles from './styles.module.scss';

const hostId = window.localStorage.getItem('id');

interface IBilling {
    id: string;
    type: 'STREAMING' | 'CHAT';
    status: string;
    createdAt: string;
    sessionCount: number;
    cost: number;
}

export default function Billing() {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);
    const [firstView, setFirstView] = useState<boolean>(true);

    const [billingSummary, setBillingSummary] = useState<number>(0);
    const [billingList, setBillingList] = useState<IBilling[]>([]);

    const [selectedMonth, setSelectedMonth] = useState('');

    useEffect(() => {
        const today = new Date();
        const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
            2,
            '0'
        )}`;
        setSelectedMonth(formattedToday);
    }, []);

    const getBillingList = async (isFirstView: boolean) => {
        try {
            const res = await request(
                'GET',
                `/v1/hosts/${hostId}/billings?size=15&page=${currentPage}&firstView=${isFirstView}`
            );

            setBillingList(res.data);
            if (res.pageCount) setPageCount(res.pageCount);
        } catch (e) {
            if (isAxiosError(e)) alert(e.response?.data.message);
        }
    };

    useEffect(() => {
        if (selectedMonth) {
            const year = selectedMonth.split('-')[0];
            const month = selectedMonth.split('-')[1];

            const startAt = new Date(Number(year), Number(month) - 1, 1);
            const endAt = new Date(Number(year), Number(month), 0);

            const getBillingSummary = async () => {
                try {
                    const res = await request(
                        'GET',
                        `/v1/hosts/${hostId}/billings/summary?status=N&startAt=${startAt.toISOString()}&endAt=${endAt.toISOString()}`
                    );

                    setBillingSummary(res.cost);
                } catch (e) {
                    if (isAxiosError(e)) alert(e.response?.data.message);
                }
            };

            getBillingSummary();
        }
    }, [selectedMonth]);

    useEffect(() => {
        getBillingList(firstView);
    }, [currentPage]);

    return (
        <>
            <div className={styles.buttonArea}>
                <input
                    className={styles.input}
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                />
                <div>{`총 과금량: $${billingSummary}`}</div>
            </div>
            <div className={styles.container}>
                {billingList.length > 0 ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>applicationId</th>
                                    <th>cost</th>
                                    <th>createdAt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {billingList.map((billing) => (
                                    <tr>
                                        <td>{billing.id}</td>
                                        <td>{`${billing.cost} $`}</td>
                                        <td>{dateForm(billing.createdAt)}</td>
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
                    <div>부과된 과금 내역이 없습니다.</div>
                )}
            </div>
        </>
    );
}
