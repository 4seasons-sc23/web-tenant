import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isAxiosError } from 'axios';

import request from 'utils/axios';

import styles from './styles.module.scss';

const hostId = window.localStorage.getItem('id');

export default function PostQuestion() {
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const { id } = useParams();

    useEffect(() => {
        const getErrorData = async () => {
            try {
                const res = await request('GET', `/v1/errors/${id}`);

                setTitle(res.question.title);
                setContent(res.question.content);
            } catch (e) {
                if (isAxiosError(e)) alert(e.response?.data.message);
            }
        };

        if (id !== '0') getErrorData();
    }, []);

    const postError = async () => {
        if (!(title && content)) {
            alert('내용을 작성해주세요');
            return;
        }
        try {
            await request('POST', '/v1/errors', { tenantId: hostId, title, content });
            alert('등록되었습니다.');
            navigate(-1);
        } catch (e) {
            if (isAxiosError(e)) alert(e.response?.data.message);
        }
    };

    const patchError = async () => {
        if (!(title && content)) {
            alert('내용을 작성해주세요');
            return;
        }
        try {
            await request('PATCH', `/v1/errors/${id}`, { title, content });
            alert('수정되었습니다.');
            navigate(-1);
        } catch (e) {
            if (isAxiosError(e)) alert(e.response?.data.message);
        }
    };

    return (
        <div className={styles.postBox}>
            <div className={styles.inputBox}>
                <div>title</div>
                <input
                    placeholder="문의 제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <div className={styles.bold}>content</div>
                <textarea
                    placeholder="문의 내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
            <button onClick={id === '0' ? postError : patchError}>
                {id === '0' ? '등록하기' : '수정하기'}
            </button>
        </div>
    );
}
