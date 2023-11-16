import { isAxiosError } from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import { IApplication } from 'types/application';

import request from 'utils/axios';
import { loginCheck } from 'utils/loginCheck';

const id = window.localStorage.getItem('id');

const fetchApplications = async (page: number) => {
    if (!loginCheck()) {
        alert('로그인 먼저 해주세요');
        window.location.href = '/signin';
    }

    const { data } = await request(
        'GET',
        `/v1/hosts/${id}/applications?page=${page}&size=15&firstView=true`
    );
    return data;
};

export const useApplications = (page: number) =>
    useQuery<IApplication[]>(['applications', id], () => fetchApplications(page));

const addApplication = async (type: 'CHAT' | 'STREAMING') => {
    try {
        const { data } = await request('POST', `/v1/hosts/${id}/applications`, { type });
        return data;
    } catch (e) {
        if (isAxiosError(e)) alert(e.response?.data.message);
        return null;
    }
};

export const useAddApplication = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ type }: { type: 'CHAT' | 'STREAMING' }) => addApplication(type), // 여기에서 함수 형식을 조정합니다.
        {
            onSuccess: () => {
                queryClient.invalidateQueries('applications');
            },
        }
    );
};

const deleteApplication = async (appId: string, ApiKey: string) => {
    const headers = { ApiKey };

    try {
        await request('DELETE', `/v1/hosts/${id}/applications/${appId}`, null, headers);
    } catch (e) {
        if (isAxiosError(e)) alert(e.response?.data.message);
    }
};

export const useDeleteApplication = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ appId, apiKey }: { appId: string; apiKey: string }) => deleteApplication(appId, apiKey),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('applications');
            },
        }
    );
};

const patchApplication = async (appId: string, ApiKey: string, status: 'N' | 'P' | 'F') => {
    const headers = { ApiKey };
    const type = status === 'N' ? 'end' : 'start';

    try {
        await request('PATCH', `/v1/hosts/${id}/applications/${appId}/${type}`, null, headers);
    } catch (e) {
        if (isAxiosError(e)) alert(e.response?.data.message);
    }
};

export const usePatchApplication = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ appId, apiKey, status }: { appId: string; apiKey: string; status: 'N' | 'P' | 'F' }) =>
            patchApplication(appId, apiKey, status),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('applications');
            },
        }
    );
};
