// eslint-disable-next-line import/prefer-default-export
export const loginCheck = () => {
    const id = localStorage.getItem('id');
    if (!id) return false;
    return true;
};
