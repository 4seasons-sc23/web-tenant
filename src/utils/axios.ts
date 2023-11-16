import axios, { Method } from 'axios';

const SERVER_DEPOLY_URL =
    process.env.NODE_ENV === 'production' ? `${window.origin}/api` : 'http://10.16.16.41:31371/api';

const request = async (method: Method, url: string, data?: unknown, headers?: object) => {
    try {
        const response = await axios({
            method,
            url: SERVER_DEPOLY_URL + url,
            data,
            headers: {
                ...headers,
            },
        });
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export default request;
