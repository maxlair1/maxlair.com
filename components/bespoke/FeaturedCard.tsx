import * as React from 'react';
import Image from 'next/image';

import styles from './FeaturedCard.module.css';

interface FeaturedCardProps {
    title: string;
    description: string;
    src: string;
    dithered?: boolean;
    href?: string;
}

export default function FeaturedCard({ title, description, src, dithered, href }: FeaturedCardProps) {
    return (
        <a href={href ?? ''} className={styles.link}>
            <div className={styles.card}>
                <div className={styles.image}>
                    <Image src={src} alt={title} fill={true} style={{objectFit: 'cover'}} loading='eager'/>
                </div>
                <div className={styles.label}>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.description}>{description}</p>
                </div>
            {dithered && <span className={styles.dithered}>Dithered</span>}
            </div>
        </a>
    );
}
