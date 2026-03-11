'use client';

import * as React from 'react';
import styles from './page.module.css';
import MarkdownFormatter from '@root/components/md/MarkdownFormatter';
import Gallery from '@root/components/bespoke/Gallery';
import useContent, { ImageData as ContentImageData } from '@root/app/content/useContent';



function RemoteLayout({ children, showGallery }: { children: React.ReactNode, showGallery: boolean }) {
    const { load, images: allImages } = useContent();
    const [images, setImages] = React.useState<ContentImageData[]>([]);
    const [file, setFile] = React.useState<string>();
    
    const getGalleryState = (path: string) => {
        // using the path here  we can see if there are any path properties 
    }
    
    return (
        <div className={styles.container}>
            <body>
                {children}
            </body>
            {showGallery ? (
                <div className={styles.gallery}>
                    <Gallery images={img} />
                </div>
            ) : null}
        </div>
    );
};

export default function letsRead({ params }: { params: Promise<{ slug: string[] }> }) {
    const [loading, setLoading] = React.useState(false);
    const [showGallery, setShowGallery] = React.useState<boolean>(false);
    const { slug } = React.use(params);
    const path = `docs/${slug.join('/')}`;

    return (
        <React.Suspense fallback={<span className={styles.loading}>Loading...</span>}>
            <RemoteLayout showGallery={showGallery}>
                <MarkdownFormatter path={path} />
            </RemoteLayout>
        </React.Suspense>
    );

}

