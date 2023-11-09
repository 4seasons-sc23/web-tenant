import { useState } from 'react';

import request from 'utils/axios';

import styles from './styles.module.scss';

export default function FindIdContainer() {
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const onClickFindButton = async () => {
        try {
            const res = await request('POST', '/v1/hosts/find/id', { phoneNumber });

            console.log(res);
        } catch (e: any) {
            console.error(e);
            alert(e.response.message);
        }
    };
    return (
        <div className={styles.container}>
            <input
                value={phoneNumber}
                placeholder="PhoneNumber (ex. 010-0000-0000)"
                onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <button onClick={onClickFindButton}>Find</button>
        </div>
    );
}
