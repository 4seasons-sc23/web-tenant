import React, { useState } from 'react';
import { isAxiosError } from 'axios';

import request from 'utils/axios';

import styles from './styles.module.scss';

const id = window.localStorage.getItem('id');

export default function PostQuestion() {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const postError = async () => {
        try {
            await request('POST', '/v1/errors', { tenantId: id, title, content });
        } catch (e) {
            if (isAxiosError(e)) alert(e.response?.data.message);
        }
    };

    return (
        <div className={styles.postBox}>
            <input
                placeholder="문의 제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="문의 내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={postError}>등록하기</button>
        </div>
    );
}
