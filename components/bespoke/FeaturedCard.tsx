'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Dithered from './Dithered';

import styles from './FeaturedCard.module.css';

interface FeaturedCardProps {
    title: string;
    src: string;
    description?: string;
    dithered?: boolean;
    href?: string;
}

export default function FeaturedCard({ title, description, src, dithered, href }: FeaturedCardProps) {
    const router = useRouter();
    const [ditherProcessing, setDitherProcessing] = React.useState(true);
    
    return (
        <div className={styles.card} onClick={() => router.replace(href ?? '') }>
            <div className={styles.image}>
                {dithered ? <Dithered src={src} alt={title} onProcessed={() => setDitherProcessing(false)} /> : <Image src={src} alt={title} fill={true} style={{objectFit: 'cover'}} loading='eager' />}
            </div>
            <div className={styles.label}>
                <p>{title}</p>
                {description && <small>{description}</small>}
            </div>
        </div>
    );
}
