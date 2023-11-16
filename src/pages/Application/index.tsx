import { useEffect, useState } from 'react';

import ApplicationTable from 'components/organisms/Application/ApplicationTable';
import PaginationComponent from 'components/organisms/Common/Pagination';

import { usePostApplication, useApplications } from 'utils/query/useApplicationQuery';

import styles from './styles.module.scss';

export default function Application() {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);
    const [totalElementCount, setTotalElementCount] = useState<number>(0);
    const [firstView, setFirstView] = useState<boolean>(true);

    const { data: applications } = useApplications(currentPage, firstView);
    const addApplicationMutation = usePostApplication();

    useEffect(() => {
        if (applications && firstView) {
            setPageCount(applications.pageCount);
            setTotalElementCount(applications.totalElementCount);
            setFirstView(false);
        }
    }, [applications, firstView]);

    const onClickAddChatApplication = () => {
        addApplicationMutation.mutate({ type: 'CHAT' });
        setFirstView(true);
    };

    const onClickAddStreamingApplication = () => {
        addApplicationMutation.mutate({ type: 'STREAMING' });
        setFirstView(true);
    };

    return (
        <div>
            <div className={styles.buttonArea}>
                <button onClick={onClickAddChatApplication}>채팅 어플리케이션 추가하기</button>
                <button onClick={onClickAddStreamingApplication}>
                    라이브 어플리케이션 추가하기
                </button>
            </div>
            <div className={styles.applicationList}>
                {applications ? (
                    <div className={styles.table}>
                        <ApplicationTable
                            applicationList={applications.data}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            setFirstView={setFirstView}
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
