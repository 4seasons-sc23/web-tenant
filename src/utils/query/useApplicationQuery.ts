import { useQuery, useMutation, useQueryClient } from 'react-query';

import request from 'utils/axios';

const fetchApplications = async (id: string | null) => {
    const { data } = await request(
        'GET',
        `/v1/hosts/${id}/applications?page=0&size=10&firstView=true`
    );
    return data;
};

const addApplication = async (id: string | null) => {
    const { data } = await request('POST', `/v1/hosts/${id}/applications`, { type: 'STREAMING' });
    return data;
};

export const useApplications = (id: string | null) =>
    useQuery(['applications', id], () => fetchApplications(id));

export const useAddApplication = () => {
    const queryClient = useQueryClient();

    return useMutation((id: string | null) => addApplication(id), {
        onSuccess: () => {
            queryClient.invalidateQueries('applications');
        },
    });
};
