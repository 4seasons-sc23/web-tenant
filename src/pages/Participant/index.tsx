import { isAxiosError } from 'axios';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import request from 'utils/axios';

export default function Participant() {
    const id = window.localStorage.getItem('id');

    const location = useLocation();
    const params = new URLSearchParams(location.search);

    const apiKey = params.get('apiKey');
    const sessionId = params.get('sessionId');

    useEffect(() => {
        const getParticipantList = async () => {
            try {
                const res = await request(
                    'GET',
                    `/v1/hosts/${id}/applications/sessions/${sessionId}/participants?page=0&size=15&firstView=true`,
                    null,
                    { ApiKey: apiKey }
                );
            } catch (e) {
                if (isAxiosError(e)) alert(e.response?.data.message);
            }
        };

        getParticipantList();
    }, []);

    return <div>Participant</div>;
}
