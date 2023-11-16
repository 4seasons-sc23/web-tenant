import { isAxiosError } from 'axios';

import request from 'utils/axios';
import { loginCheck } from 'utils/loginCheck';

const id = window.localStorage.getItem('id');

export const getApplications = async (page: number) => {
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

export const postApplications = async (type: 'CHAT' | 'STREAMING') => {
    try {
        const { data } = await request('POST', `/v1/hosts/${id}/applications`, { type });
        return data;
    } catch (e) {
        if (isAxiosError(e)) alert(e.response?.data.message);
        return null;
    }
};

export const deleteApplications = async (appId: string, ApiKey: string) => {
    const headers = { ApiKey };

    try {
        await request('DELETE', `/v1/hosts/${id}/applications/${appId}`, null, headers);
    } catch (e) {
        if (isAxiosError(e)) alert(e.response?.data.message);
    }
};

export const patchApplications = async (appId: string, ApiKey: string, status: 'N' | 'P' | 'F') => {
    const headers = { ApiKey };
    const type = status === 'N' ? 'end' : 'start';

    try {
        await request('PATCH', `/v1/hosts/${id}/applications/${appId}/${type}`, null, headers);
    } catch (e) {
        if (isAxiosError(e)) alert(e.response?.data.message);
    }
};
