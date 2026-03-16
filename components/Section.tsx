import * as React from 'react';

import styles from './Section.module.css';
import * as Utilities from '@lib/utilities';

type Bleed = 'readable' | 'medium' | 'full' | 'escaped';

export default function Section({children, bleed = 'readable', spaceBefore = true, spaceAfter = true, style, backgroundColor, ...rest}: {children: React.ReactNode, bleed?: Bleed, spaceBefore?: boolean, spaceAfter?: boolean, style?: React.CSSProperties, backgroundColor?: string}): React.ReactElement { 
    return (
        <section 
            className={Utilities.classNames(styles.root, (spaceBefore ? styles.spaceBefore : ''), (spaceAfter ? styles.spaceAfter : ''))}
            {...rest} 
            role='container' 
            aria-label='section'
            style={{...style, backgroundColor: backgroundColor}}
        >
            <div className={Utilities.classNames(styles.wrapper, (bleed ? styles[bleed] : ''))}>
                {children}
            </div>
        </section>
    );
}