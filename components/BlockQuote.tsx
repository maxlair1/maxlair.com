import styles from '@components/BlockQuote.module.css';

import * as React from 'react';


export default function Blockquote({ children }: { children: React.ReactNode }) {

    return (
        <blockquote className={styles.quote}>
            {children}
        </blockquote>
    )
}