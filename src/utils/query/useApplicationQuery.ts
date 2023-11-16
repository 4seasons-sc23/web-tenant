import { useQuery, useMutation, useQueryClient } from 'react-query';

import { IApplication } from 'types/application';

import * as appApi from 'utils/api/applicationApi';

const id = window.localStorage.getItem('id');

export const useApplications = (page: number) =>
    useQuery<IApplication[]>(['applications', id], () => appApi.getApplications(page));

export const usePostApplication = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ type }: { type: 'CHAT' | 'STREAMING' }) => appApi.postApplications(type), // 여기에서 함수 형식을 조정합니다.
        {
            onSuccess: () => {
                queryClient.invalidateQueries('applications');
            },
        }
    );
};

export const useDeleteApplication = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ appId, apiKey }: { appId: string; apiKey: string }) =>
            appApi.deleteApplications(appId, apiKey),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('applications');
            },
        }
    );
};

export const usePatchApplication = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ appId, apiKey, status }: { appId: string; apiKey: string; status: 'N' | 'P' | 'F' }) =>
            appApi.patchApplications(appId, apiKey, status),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('applications');
            },
        }
    );
};
