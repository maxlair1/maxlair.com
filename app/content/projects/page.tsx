import * as React from 'react';

import styles from './page.module.css';

import ContentLayout from '@root/components/bespoke/ContentLayout';
import Image from 'next/image';
import Row from '@root/components/Row';

interface FeaturedContainerProps {
    screen:string, 
    icon:string,
    title:string,
    description:string
}

const FeaturedContainer = ({screen, icon, title, description}:FeaturedContainerProps): React.ReactElement => {
    return (
        <div className={styles.featuredContainer}>
            <Image className={styles.image} src={icon} alt={title} width={100} height={100} />
            <div className={styles.imageContainer}>
                <Image className={styles.image} src={screen} alt={title} fill={true} />
            </div>
        </div>
    )
}

export default function Page(): React.ReactElement {
    return (
        <ContentLayout readableLineLength={false}>
            <header style={{width: '100%', textAlign: 'left'}}>
                <h1>Projects</h1>
            </header>
            <section>
                <Row>
                    <FeaturedContainer screen="/doro_screen.png" icon="/doro_appicon.png" title="Dedoro" description="A heart rate workout app, built with science and designed for everyone."/>
                </Row>
            </section>
        </ContentLayout>
    )
}