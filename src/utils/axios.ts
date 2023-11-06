import axios, { Method } from 'axios';

const SERVER_DEPOLY_URL = 'http://localhost:8080/api';

const request = async (method: Method, url: string, data?: any) => {
    try {
        const response = await axios({ method, url: SERVER_DEPOLY_URL + url, data });
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export default request;
