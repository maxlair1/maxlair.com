'use client';

import * as React from 'react';
import styles from './page.module.css';
import DocLoader from '@root/components/bespoke/DocLoader';
import Navigation from "@components/Navigation";
import ActionBar from "@components/ActionBar";
import Gallery from "@components/bespoke/Gallery";
import useContent from '@root/app/content/useContent';


function RemoteLayout({ children }: { children: React.ReactNode }) {
    const { images } = useContent();
    const actions = [
        {
            body: "SHARE",
        },
        {
            body: "GALLERY",
        }
    ];

    return (
        <div className={styles.root}>
            {/* <Navigation logoHref="/" logoTarget="_self" logo={<Logo type="icon" fill="var(--theme-focused-foreground)"/>}> */}
            <Navigation className={styles.header}>
                <ActionBar items={actions} />
            </Navigation>
            <div className={styles.wrapper}>
                <div className={styles.content}>
                    {children}
                </div>
                <Gallery images={images} />
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default function letsRead({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = React.use(params);
    const path = `docs/${slug.join('/')}`;

    return (
        <RemoteLayout>
            <DocLoader path={path} />
        </RemoteLayout>
    );

}

