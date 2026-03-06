'use client';

import * as React from 'react';
import styles from './page.module.css';
import DocLoader from '@root/components/bespoke/DocLoader';
import Navigation from "@components/Navigation";
import ActionBar from "@components/ActionBar";
import useContent from '@root/app/content/useContent';
import Row from '@root/components/Row';
import Link from 'next/link';
function Gallery() {
    const { images } = useContent();

    return (
        <div className={styles.gallery}>
            <ol>
                {images.map((img, idx) => (
                    <li key={idx}>
                        <span className={styles.title}>
                            {img.title}
                        </span>
                        <span className={styles.trailing}>
                            <Link href={img.url} target="_blank">[VIEW]</Link>
                        </span>
                    </li>
                ))}
            </ol>
        </div>    
    )
}

function RemoteLayout({ children }: { children: React.ReactNode }) {
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
                <Gallery />
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default function letsRead({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = React.use(params);
    const path = slug.join('/');

    return (
        <RemoteLayout>
            <DocLoader path={path} />
        </RemoteLayout>
    );

}

