import { useState } from 'react';

import ApplicationTable from 'components/organisms/Application/ApplicationList';

import { usePostApplication, useApplications } from 'utils/query/useApplicationQuery';

import styles from './styles.module.scss';

export default function Application() {
    const [currentPage, setCurrentPage] = useState<number>(0);

    const { data: applications } = useApplications(currentPage);
    const addApplicationMutation = usePostApplication();

    const onClickAddChatApplication = () => {
        addApplicationMutation.mutate({ type: 'CHAT' });
    };

    const onClickAddStreamingApplication = () => {
        addApplicationMutation.mutate({ type: 'STREAMING' });
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
                    <ApplicationTable applicationList={applications} />
                ) : (
                    <div>현재 생성된 어플리케이션이 없습니다. 어플리케이션을 생성해주세요.</div> // 데이터가 로딩 중이거나 없을 때 표시
                )}
            </div>
        </div>
    );
}
