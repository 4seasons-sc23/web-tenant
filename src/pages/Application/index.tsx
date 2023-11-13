import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';

import { useAddApplication, useApplications } from 'utils/query/useApplicationQuery';

export default function Application() {
    const navigate = useNavigate();
    const id = localStorage.getItem('id');

    const { data: applications } = useApplications(id);
    const addApplicationMutation = useAddApplication();

    const onClickAddApplication = () => {
        addApplicationMutation.mutate(id);
    };

    const onClickGetApplicationList = () => {
        console.log(applications);
    };

    return (
        <div>
            <button onClick={onClickAddApplication}>어플리케이션 추가하기</button>
            <button onClick={onClickGetApplicationList}>어플리케이션 목록 가져오기</button>
        </div>
    );
}
