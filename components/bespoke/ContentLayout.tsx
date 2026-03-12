import * as React from 'react';

import Gallery from "./Gallery";
import styles from './ContentLayout.module.css'
// import useImages, {ImageData, ContentImageData} from "@root/app/content/useContent";

export default function ContentLayout({ children, className, readableLineLength = true, showGallery = false }: { children: React.ReactNode, showGallery?: boolean, className?: string, readableLineLength?: boolean }): React.JSX.Element {
    // const { list } = useImages();
    // const [images, setImages] = React.useState<ContentImageData[]>([]);
          

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <article className={`${styles.article} ${className || ''} ${readableLineLength ? styles.readable : ''}`}>
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