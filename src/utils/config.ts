// eslint-disable-next-line import/prefer-default-export
export const REACT_QUERY_CONFIG = {
    defaultOptions: {
        queries: {
            staleTime: 0,
            cacheTime: 60 * 60 * 24 * 1000,
            refetchOnWindowFocus: false,
            suspense: true,
            throwOnError: true,
            retry: 3,
        },
    },
};
