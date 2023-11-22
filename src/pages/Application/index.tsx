import { useEffect, useState } from 'react';

import ApplicationTable from 'components/organisms/Application/ApplicationTable';
import PaginationComponent from 'components/organisms/Common/Pagination';

import { usePostApplication, useApplications } from 'utils/query/useApplicationQuery';

import styles from './styles.module.scss';

export default function Application() {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);

    const { data: applications } = useApplications(currentPage);
    const addApplicationMutation = usePostApplication();

    useEffect(() => {
        if (applications) {
            setPageCount(applications.pageCount);
        }
    }, [applications]);

    const onClickAddChatApplication = () => {
        addApplicationMutation.mutate({ type: 'CHAT' });
    };

    const onClickAddStreamingApplication = () => {
        addApplicationMutation.mutate({ type: 'STREAMING' });
    };

    return (
        <div className={styles.container}>
            <div className={styles.buttonArea}>
                <button onClick={onClickAddStreamingApplication}>
                    <span>Add Live Application</span>
                    <span>+</span>
                </button>
                <button onClick={onClickAddChatApplication}>
                    <span>Add Chat Application</span>
                    <span>+</span>
                </button>
            </div>
            <div className={styles.applicationList}>
                {applications ? (
                    <div className={styles.table}>
                        <ApplicationTable
                            applicationList={applications.data}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                        <PaginationComponent
                            currentPage={currentPage}
                            setPage={setCurrentPage}
                            pageCount={pageCount}
                        />
                    </div>
                ) : (
                    <div>현재 생성된 어플리케이션이 없습니다. 어플리케이션을 생성해주세요.</div> // 데이터가 로딩 중이거나 없을 때 표시
                )}
            </div>
        </div>
    );
}
