# InStream Tenant Application Page

## 개요

4학년 2학기 SW캡스톤디자인 "실시간 라이브 스트리밍 SaaS" 프로젝트 중, 기업용 어플리케이션 페이지 프로젝트입니다. 주요 기능은 다음과 같습니다.

-   InStream 기업 서비스 제공
    -   영상, 채팅 어플리케이션 생성 및 사용
    -   사용량 내역 조회 및 결제
    -   InStream 서비스 관련 문의하기

## docker + nginx로 배포하는 과정

이후 터미널에서 다음 명령어를 실행합니다.

```shell
docker build --tag web-tenant .
docker run -d -p 3001:80 --name web-tenant web-tenant
```
