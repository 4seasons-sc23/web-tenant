export interface ISession {
    id: string;
    createdAt: string;
    deletedAt: string | null;
}

/**
- N - 활성화
- P - 비활성화
- F - 정지
*/

export interface IApplication {
    id: string;
    type: 'CHAT' | 'STREAMING';
    apiKey: string;
    status: 'N' | 'P' | 'F';
    createdAt: string;
    session: ISession | null;
}
