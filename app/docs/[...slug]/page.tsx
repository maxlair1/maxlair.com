'use client';

import * as React from 'react';
import styles from './page.module.css';
import MarkdownFormatter from '@root/components/md/MarkdownFormatter';
import Navigation from "@components/Navigation";
import ActionBar from "@components/ActionBar";


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
            {/* <Navigation className={styles.header}>
                <ActionBar items={actions} />
            </Navigation> */}
            {children}
            {/* <Footer /> */}
        </div>
    );
};

export default function letsRead({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = React.use(params);
    const path = `docs/${slug.join('/')}`;

    return (
        <RemoteLayout>
            <MarkdownFormatter path={path} />
        </RemoteLayout>
    );

}

