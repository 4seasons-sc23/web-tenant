import { useState } from 'react';

import FindIdContainer from 'components/organisms/Account/Find/FindIdContainer';

import styles from './styles.module.scss';

export default function Find() {
    const [isFindEmail, setIsFindEmail] = useState<boolean>(true);

    return (
        <div className={styles.container}>
            <FindIdContainer />
        </div>
    );
}
