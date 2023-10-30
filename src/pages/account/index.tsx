import SigninContainer from 'components/organisms/account/SigninContainer';

import styles from './styles.module.scss';

export default function Account() {
    return (
        <div className={styles.container}>
            <SigninContainer />
        </div>
    );
}
