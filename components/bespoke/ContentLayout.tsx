'use client';

import * as React from 'react';

import Gallery from "./Gallery";
import styles from './ContentLayout.module.css'
import * as Utilities from '@lib/utilities';
// import useImages, {ImageData, ContentImageData} from "@root/app/content/useContent";

export default function ContentLayout({ children, className, showGallery = false, ...rest }: { children: React.ReactNode, showGallery?: boolean, className?: string, bleed?: boolean, style?: React.CSSProperties }): React.JSX.Element {
    // const { list } = useImages();
    // const [images, setImages] = React.useState<ContentImageData[]>([]);
        
    return (
        <div className={styles.root} {...rest}>
            <div className={styles.content}>
                <div className={Utilities.classNames(styles.main, className)}>
                    {children}
                </div>
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