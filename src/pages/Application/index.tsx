import { useEffect, useState } from 'react';
import { isAxiosError } from 'axios';

import ApplicationTable from 'components/organisms/Application/ApplicationTable';
import PaginationComponent from 'components/organisms/Common/Pagination';

import { IApplication } from 'types/application';

import request from 'utils/axios';

import styles from './styles.module.scss';

const id = localStorage.getItem('id');

export default function Application() {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);
    const [firstView, setFirstView] = useState<boolean>(true);

    const [applications, setApplications] = useState<IApplication[]>([]);

    const getApplicationList = async (isFirstView: boolean) => {
        const res = await request(
            'GET',
            `/v1/hosts/${id}/applications?page=${currentPage}&size=15&firstView=${isFirstView}`
        );
        setApplications(res.data);

        if (res.pageCount) setPageCount(res.pageCount);
    };

    useEffect(() => {
        getApplicationList(firstView);
    }, [currentPage]);

    const onClickAddApplication = (type: string) => async () => {
        try {
            await request('POST', `/v1/hosts/${id}/applications`, { type });
            getApplicationList(true);
        } catch (e) {
            if (isAxiosError(e)) alert(e.response?.data.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.buttonArea}>
                <button onClick={onClickAddApplication('STREAMING')}>
                    <span>Add Streaming Application</span>
                    <span>+</span>
                </button>
                <button onClick={onClickAddApplication('CHAT')}>
                    <span>Add Chat Application</span>
                    <span>+</span>
                </button>
                <button onClick={onClickAddApplication('LIVE')}>
                    <span>Add Live Application</span>
                    <span>+</span>
                </button>
            </div>
            <div className={styles.applicationList}>
                {applications ? (
                    <div className={styles.table}>
                        <ApplicationTable
                            applicationList={applications}
                            getApplicationList={getApplicationList}
                        />
                        <PaginationComponent
                            currentPage={currentPage}
                            setPage={setCurrentPage}
                            pageCount={pageCount}
                            setFirstView={setFirstView}
                        />
                    </div>
                ) : (
                    <div>현재 생성된 어플리케이션이 없습니다. 어플리케이션을 생성해주세요.</div>
                )}
            </div>
        </div>
    );
}
