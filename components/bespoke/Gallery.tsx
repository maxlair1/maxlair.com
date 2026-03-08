import * as React from 'react';
import styles from './Gallery.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { type ImageData } from '@root/app/content/useContent';

export default function Gallery({ images, open = true }: { images: ImageData[], open?: boolean }): React.JSX.Element {
    const [src, setSrc] = React.useState<string | undefined>();

    return (
        <div className={styles.root}>
            <div className={styles.viewer}>
                {src ? (
                    <Image className={styles.image} src={String(src)} fill style={{objectFit: 'contain', margin: '0 auto'}} alt={src}/>
            ) : 'select image'}
            </div>
            <div className={styles.list}>
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
        </div>    
    )
}