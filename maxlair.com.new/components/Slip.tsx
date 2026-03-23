import * as React from 'react';

import styles from './Slip.module.css';

import Image from 'next/image';
import Divider from '../Divider';
import * as Utilities from '@/app/lib/utilities';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';


type SlipProps = {
    color: 'green' | 'teal' | 'maroon' | 'daybreak';
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
        '--slip-border': `var(--color-${accent}-80-3)`,
        '--slip-bg': `var(--color-${accent})`,
        '--slip-title': `var(--color-${accent}-100)`
    } as React.CSSProperties
}

export default function Slip({color, src = '/', title, subtitle, children, before, imageMargin = false, href = '#', footer = null, style = undefined, ...rest}: SlipProps):React.ReactElement {
    return (
    <div className={Utilities.classNames(styles.root, styles[color])} style={{...style, ...getColorStyles(color)}} {...rest}>
        <header>
            {before && <caption>{before}</caption>}
            {src && (
                <div className={imageMargin ? styles.imageMargin : ''}>
                    <figure>
                        <Image src={src} fill={true} alt="bean_test" style={{objectFit: 'cover'}} />
                    </figure>
                </div>
            )}
            {/* <figcaption>simple caption</figcaption> */}
            <div className={styles.titles}>
                <h3>
                    {title}
                </h3>
                <h4>
                    {subtitle}
                </h4>
            </div>
            <Divider style={{borderColor: 'var(--color-teal-80)'}} type='DOTTED' />
        </header>

        <div className={styles.slipBody}>
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