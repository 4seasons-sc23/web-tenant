import { SectionsContainer, Section } from 'react-fullpage';

import styles from './styles.module.scss';

export default function Home() {
    const options = {
        anchors: ['sectionOne', 'sectionTwo', 'sectionThree'],
    };

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <SectionsContainer {...options}>
            <Section>
                <div className={styles.container}>
                    <h1>여러분들을 위한 라이브 스트리밍 SaaS 플랫폼</h1>
                    <span>IN-STREAM</span>
                </div>
            </Section>
            <Section>
                <div className={styles.container}>
                    <h1>라이브 어플리케이션 생성</h1>
                </div>
            </Section>
            <Section>
                <div className={styles.container}>
                    <h1>채팅 어플리케이션 생성</h1>
                </div>
            </Section>
        </SectionsContainer>
    );
}
