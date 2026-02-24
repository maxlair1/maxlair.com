import styles from './page.module.css'

import * as React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className={styles.root}>
            {children}
        </div>
    )
}