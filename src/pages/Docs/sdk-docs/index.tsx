import React from 'react';
import ReactMarkdown from 'react-markdown';

import styles from './styles.module.scss';

const SDK_DOCS_TEXT = `
실시간 라이브 스트리밍 SaaS 프로젝트 "Instream" 중 테넌트 페이지 프로젝트입니다.

## 주요 기능
+ sdk 컴포넌트 사용을 위한 어플리케이션 생성 및 key값 발급
+ InStream 서비스 관련 문의하기 기능 제공
+ 사용량 내역 조회

## 주요 특징
+ pagination등 공통 컴포넌트의 사용.

## docker + nginx로 배포하는 과정

이후 터미널에서 다음 명령어를 실행합니다.

\`\`\`shell
docker build --tag web-tenant .
docker run -d -p 3001:80 --name web-tenant web-tenant
\`\`\`
`;

export default function SDKDOCS() {
    return (
        <div className={styles.container}>
            <ReactMarkdown>{SDK_DOCS_TEXT}</ReactMarkdown>
        </div>
    );
}
