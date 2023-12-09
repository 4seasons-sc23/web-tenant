import React, { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import PaginationComponent from 'components/organisms/Common/Pagination';

import request from 'utils/axios';
import { dateForm } from 'utils/dateForm';

import styles from './styles.module.scss';

const hostId = window.localStorage.getItem('id');

interface IBilling {
    id: string;
    type: 'STREAMING' | 'CHAT' | 'LIVE';
    status: string;
    createdAt: string;
    sessionCount: number;
    cost: number;
}

export default function Billing() {
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);
    const [firstView, setFirstView] = useState<boolean>(true);

    const [billingSummary, setBillingSummary] = useState<number>(0);
    const [billingList, setBillingList] = useState<IBilling[]>([]);

    const [selectedMonth, setSelectedMonth] = useState('');

    const getCurrentMonthDates = () => {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString();
        return { startOfMonth, endOfMonth };
    };

    const { startOfMonth, endOfMonth } = getCurrentMonthDates();

    const [startAt, setStartAt] = useState<string>(startOfMonth);
    const [endAt, setEndAt] = useState<string>(endOfMonth);

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
                `/v1/hosts/${hostId}/billings?size=15&page=${currentPage}&firstView=${isFirstView}&startAt=${startAt}&endAt=${endAt}`
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

            const newStartAt = new Date(Number(year), Number(month) - 1, 1).toISOString();
            const newEndAt = new Date(Number(year), Number(month), 0).toISOString();

            setStartAt(newStartAt);
            setEndAt(newEndAt);
        }
    }, [selectedMonth]);

    useEffect(() => {
        const getBillingSummary = async () => {
            try {
                const res = await request(
                    'GET',
                    `/v1/hosts/${hostId}/billings/summary?status=N&startAt=${startAt}&endAt=${endAt}`
                );

                setBillingSummary(res.cost);
            } catch (e) {
                if (isAxiosError(e)) alert(e.response?.data.message);
            }
        };

        getBillingSummary();
    }, [startAt, endAt]);

    useEffect(() => {
        getBillingList(firstView);
    }, [currentPage, startAt, endAt]);

    return (
        <>
            <div className={styles.buttonArea}>
                <input
                    className={styles.input}
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                />
                <div>{`총 과금량: $${billingSummary.toFixed(2)}`}</div>
            </div>
            <div className={styles.container}>
                {billingList.length > 0 ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>applicationId</th>
                                    <th>sessionCount</th>
                                    <th>cost</th>
                                    <th>createdAt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {billingList.map((billing) => (
                                    <tr>
                                        <td
                                            style={{ cursor: 'pointer' }}
                                            onClick={() =>
                                                navigate(
                                                    `/billing/${billing.id}?startAt=${startAt}&endAt=${endAt}`
                                                )
                                            }
                                        >
                                            {billing.id}
                                        </td>
                                        <td>{billing.sessionCount}</td>
                                        <td>{`${billing.cost.toFixed(2)} $`}</td>
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
