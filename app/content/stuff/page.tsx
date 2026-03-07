'use client';
import * as React from 'react';
import Image from 'next/image';
import useContent from '../useContent';
import styles from './page.module.css';
import Gallery from '@root/components/bespoke/Gallery';

export default function Stuff(): React.JSX.Element {
    const { images } = useContent();

    React.useEffect(() => {
        
    }, []);

    return (
        <div className={styles.root}>
            <div className={styles.stuff}>
                {images.map((img, idx) => (
                    <div key={idx} className={styles.item}>
                        <div className={styles.imageWrapper}>
                            <Image src={img.url} fill style={{objectFit: 'contain'}} alt={img.title}/>
                        </div>
                        <figcaption>caption test</figcaption>
                    </div>
                ))}
            </div>
            <div className={styles.gallery}>
                <Gallery images={images} />
            </div>
        </div>
    );
}
