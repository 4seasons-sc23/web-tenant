import { useQuery, useMutation, useQueryClient } from 'react-query';

import { IApplication } from 'types/application';

import request from 'utils/axios';

const fetchApplications = async (id: string | null, page: number) => {
    const { data } = await request(
        'GET',
        `/v1/hosts/${id}/applications?page=${page}&size=15&firstView=true`
    );
    return data;
};

const addApplication = async (id: string | null, type: 'CHAT' | 'STREAMING') => {
    const { data } = await request('POST', `/v1/hosts/${id}/applications`, { type });
    return data;
};

export const useApplications = (id: string | null, page: number) =>
    useQuery<IApplication[]>(['applications', id], () => fetchApplications(id, page));

export const useAddApplication = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ id, type }: { id: string | null; type: 'CHAT' | 'STREAMING' }) =>
            addApplication(id, type), // 여기에서 함수 형식을 조정합니다.
        {
            onSuccess: () => {
                queryClient.invalidateQueries('applications');
            },
        }
    );
};
