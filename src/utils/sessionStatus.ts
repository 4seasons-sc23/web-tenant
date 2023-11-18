import { ISession } from 'types/application';

// eslint-disable-next-line import/prefer-default-export
export const sessionStatus = (session: ISession | null) => {
    if (!session) return 'off';

    return session.deletedAt ? 'off' : 'on';
};
