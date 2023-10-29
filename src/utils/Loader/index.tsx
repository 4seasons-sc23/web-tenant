import { PulseLoader } from 'react-spinners';

import styles from './styles.module.scss';

export default function Loader() {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.overlay} />
            <div className={styles.loader}>
                <PulseLoader color="#009aea" size={15} />
            </div>
        </div>
    );
}
