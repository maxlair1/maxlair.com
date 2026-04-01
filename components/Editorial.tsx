'use client';
import * as React from 'react';

import styles from './Editorial.module.css';

import Image from 'next/image';
// import Divider from '../Divider';
import * as Utilities from '@/app/lib/utilities';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';


type EditorialProps = {
    color: 'green' | 'teal' | 'maroon' | 'orange';
    title: string;
    subtitle: string;
    children: React.ReactNode;
    
    src?: string;
    before?: React.ReactNode;
    imageHeight?: string;
    imageMargin?: boolean
    footer?: React.ReactNode;
    href?: string;
    style?: React.CSSProperties;
    [key: string]: any;
}

const getColorStyles = (accent: string): React.CSSProperties => {
    return {
        '--editorial-bg': `var(--${accent}-alpha-03)`,
        '--editorial-title': `var(--text-secondary)`
    } as React.CSSProperties
}

export default function Editorial({color, src, title, subtitle, children, before, imageMargin = false, href = '#', footer = null, style = undefined, ...rest}: EditorialProps):React.ReactElement {
    return (
    <div className={Utilities.classNames(styles.root, styles[color])} style={{...style, ...getColorStyles(color)}} {...rest}>
        <header>
            {before && <caption>{before}</caption>}
            {src && (
                <div className={imageMargin ? styles.imageMargin : ''}>
                    <figure>
                        <Image src={src} fill={true} alt={`Image for ${title}`} style={{objectFit: 'cover'}} />
                    </figure>
                </div>
            )}
            {/* <figcaption>simple caption</figcaption> */}
            <div className={styles.titles}>
                <h3>
                    {title}
                </h3>
                <small>
                    {subtitle}
                </small>
            </div>
            {/* <Divider style={{borderColor: 'var(--color-teal-80)'}} type='DOTTED' /> */}
        </header>

        <div className={styles.body}>
            {children}
        </div>
            
        {footer && (
        <footer>
            <small>
                {footer}       
            </small>
        </footer>
        )}   
    </div>
    )
} 