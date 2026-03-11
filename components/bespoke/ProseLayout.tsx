import * as React from 'react';
import styles from './ProseLayout.module.css';

export default function ProseLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    )
}