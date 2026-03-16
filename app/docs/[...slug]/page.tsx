'use client';

import * as React from 'react';
import styles from './page.module.css';
import MarkdownFormatter from '@root/components/md/MarkdownFormatter';
// import Gallery from '@root/components/bespoke/Gallery';
// import useContent, { ImageData as ContentImageData } from '@root/app/content/useContent';
import ContentLayout from '@components/bespoke/ContentLayout';
import Section from '@root/components/Section';

export default function letsRead({ params }: { params: Promise<{ slug: string[] }> }) {
    const [loading, setLoading] = React.useState(false);
    const [showGallery, setShowGallery] = React.useState<boolean>(false);
    const { slug } = React.use(params);
    const path = `docs/${slug.join('/')}`;

    return (
        <React.Suspense fallback={<span className={styles.loading}>Loading...</span>}>
            <ContentLayout showGallery={showGallery}>
                <Section>
                    <MarkdownFormatter path={path} />
                </Section>
            </ContentLayout>
        </React.Suspense>
    );

}

