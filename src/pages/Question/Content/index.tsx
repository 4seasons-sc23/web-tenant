import { isAxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import request from 'utils/axios';

import styles from './styles.module.scss';

interface IQuestion {
    errorId: number;
    tenantId: string;
    title: string;
    content: string;
    isAnswered: 'N' | 'Y';
    status: 'N' | 'Y';
    createdAt: string;
}

interface IAnswer {
    content: string | null;
    status: string | null;
    createdAt: string | null;
}

export default function QuestionContent() {
    const navigate = useNavigate();

    const { id } = useParams();

    const [questionData, setQuestionData] = useState<IQuestion>({
        errorId: 0,
        tenantId: '',
        title: '',
        content: '',
        isAnswered: 'N',
        status: 'N',
        createdAt: '',
    });

    const [answerData, setAnswerData] = useState<IAnswer>({
        content: null,
        status: null,
        createdAt: null,
    });

    useEffect(() => {
        const getErrorData = async () => {
            try {
                const res = await request('GET', `/v1/errors/${id}`);

                setQuestionData(res.question);
                setAnswerData(res.answer);
            } catch (e) {
                if (isAxiosError(e)) alert(e.response?.data.message);
            }
        };

        getErrorData();
    }, []);

    const deleteQuestion = async () => {
        if (!window.confirm('삭제하시겠습니까?')) return;
        try {
            await request('PATCH', `/v1/errors/${id}/delete`);
            alert('삭제되었습니다.');
            navigate(-1);
        } catch (e) {
            if (isAxiosError(e)) alert(e.response?.data.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.buttonArea}>
                <button onClick={() => navigate(`/question/post/${questionData.errorId}`)}>
                    modify question
                </button>
                <button onClick={deleteQuestion}>delete question</button>
            </div>
            <div>question</div>
            <div className={styles.question}>
                <div>{`title: ${questionData?.title}`}</div>
                <div>{`content: ${questionData?.content}`}</div>
            </div>
            {questionData.isAnswered === 'Y' && (
                <>
                    <div>answer</div>
                    <div className={styles.answer}>
                        <div>{`content: ${answerData?.content}`}</div>
                    </div>
                </>
            )}
        </div>
    );
}
