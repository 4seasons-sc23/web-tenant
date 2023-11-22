// eslint-disable-next-line import/prefer-default-export
export const dateForm = (date: string | null) => {
    if (!date) return 'N/A';
    const newDate = new Date(date);

    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const day = newDate.getDate().toString().padStart(2, '0');

    const hour = newDate.getHours().toString().padStart(2, '0');
    const minute = newDate.getMinutes().toString().padStart(2, '0');

    return `${year}.${month}.${day} ${hour}:${minute}`;
};
