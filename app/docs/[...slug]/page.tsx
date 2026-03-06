'use client';

import * as React from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import DocLoader from '@root/components/bespoke/DocLoader';
import Navigation from "@components/Navigation";
import ActionBar from "@components/ActionBar";
import useContent from '@root/app/content/useContent';
import Row from '@root/components/Row';
import Link from 'next/link';
function Gallery() {
    const { images } = useContent();
    const [src, setSrc] = React.useState<string | undefined>();

    return (
        <div className={styles.gallery}>
            <div style={{textAlign:'center', padding:'1ch'}}>
                {src ? <Image src={src} fill style={{objectFit: 'contain'}} alt={src}/> : 'select image'}
            </div>
            <br/>
            <ul>
                {images.map((img, idx) => (
                    <li key={idx} onClick={() => setSrc(img.url)}>
                        <span className={styles.title}>
                            {img.title}
                        </span>
                        <span className={styles.trailing}>
                            <Link href={img.url} target="_blank">[VIEW]</Link>
                        </span>
                    </li>
                ))}
            </ul>
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
    const path = `docs/${slug.join('/')}`;

    return (
        <RemoteLayout>
            <DocLoader path={path} />
        </RemoteLayout>
    );

}

