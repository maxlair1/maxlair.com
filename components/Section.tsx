import * as React from 'react';

import styles from './Section.module.css';
import * as Utilities from '@lib/utilities';

export default function Section({children, escaped, ...rest}: {children: React.ReactNode, escaped?: boolean}): React.ReactElement { 
    return (
        <section 
            className={Utilities.classNames(styles.root, (escaped ? styles.escaped : ''))}
            {...rest} 
            role='container' 
            aria-label='section'
        >
            {children}
        </section>
    );
}