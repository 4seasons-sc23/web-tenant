/**
- N - 활성화
- Y - 삭제
- P - 비활성화
- F - 정지
*/

export interface IApplication {
    applicationId: string;
    type: 'CHAT' | 'STREAMING';
    apiKey: string | null;
    status: 'N' | 'Y' | 'P' | 'F';
    createdAt: string;
    session: string | null;
}
