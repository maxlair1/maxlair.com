'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Dithered from './Dithered';
import * as Utilities from '@lib/utilities';

import styles from './FeaturedCard.module.css';

interface FeaturedCardProps {
    title: string;
    src: string;
    description?: string;
    dithered?: boolean;
    href?: string;
    color?: Color;
}

type Color = 'daybreak' | 'yellow' | 'green' | 'blue' | 'gray';


const getColor = (c?: Color) => {

    let varName: string;
    switch (c) {
        case 'daybreak':
            varName = '--color-daybreak-alt';
            break;
        case 'green':
            varName = '--color-green-50';
            break;
        case 'yellow':
            varName = '--color-gold-30';
            break;
        case 'blue':
            varName = '--color-blue-40';
            break;
        case 'gray':
            varName = '--color-gray-60';
            break;
        default:
            varName = '--color-daybreak';
            break;
    }
    const localvar = Utilities.getCssColorVar(varName);
    if (!localvar) {
        console.warn(`Color variable ${varName} not found, defaulting to [220,220,220]`);
        return [220,220,220] as [r:number, g:number, b:number];
    }
    console.log(`got color returned:`, localvar);
    return localvar;
}


export default function FeaturedCard({ title, description, src, dithered, href, color }: FeaturedCardProps) {
    const router = useRouter();
    const [ditherProcessing, setDitherProcessing] = React.useState(true);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        console.log('FeaturedCard mounted, processing dither:', ditherProcessing);
        setMounted(true);
        getColor(color);
    }, []);

    return (
        <div className={styles.card} onClick={() => router.replace(href ?? '') }>
            <div className={styles.image}>
                {mounted ? (
                    <>
                        {dithered ? <Dithered color={getColor(color)} src={src} alt={title} onProcessed={() => setDitherProcessing(false)} /> : <Image src={src} alt={title} fill={true} style={{objectFit: 'cover'}} loading='eager' />}
                    </>
                ) : null}
            </div>
            <div className={styles.label}>
                <p>{title}</p>
                {description && <small>{description}</small>}
            </div>
        </div>
    );
}
