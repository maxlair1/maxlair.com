'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Dithered from './Dithered';

import styles from './FeaturedCard.module.css';

interface FeaturedCardProps {
    title: string;
    description: string;
    src: React.ReactNode;
    dithered?: boolean;
    href?: string;
    hue?: string;
}

export default function FeaturedCard({ title, description, src, dithered, href, hue }: FeaturedCardProps) {
    const router = useRouter();
    
    return (
            <div className={styles.card} onClick={() => router.replace(href ?? '')}>
                <div className={styles.image}>
                    <Dithered src={src} alt={title} />
                    {/* <Image src={src} alt={title} fill={true} style={{objectFit: 'cover'}} loading='eager'/> */}
                </div>
                <div className={styles.label}>
                    <p>{title}</p>
                    <small>{description}</small>
                </div>
            </div>
    );
}
