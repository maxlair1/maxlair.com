'use client';

import * as React from 'react';

import Gallery from "./Gallery";
import styles from './ContentLayout.module.css'
import * as Utilities from '@lib/utilities';
// import useImages, {ImageData, ContentImageData} from "@root/app/content/useContent";

export default function ContentLayout({ children, className, bleed = true, showGallery = false }: { children: React.ReactNode, showGallery?: boolean, className?: string, bleed?: boolean }): React.JSX.Element {
    // const { list } = useImages();
    // const [images, setImages] = React.useState<ContentImageData[]>([]);
          

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <article className={Utilities.classNames(styles.article, className, bleed ? styles.bleed : '')}>
                    {children}
                </article>
                {/* <footer className={styles.footer}>
                    test
                </footer> */}
            </div>
            {showGallery ? (
                <div className={styles.gallery}>
                    <Gallery images={[]} />
                </div>
            ) : null}
        </div>
  );
};