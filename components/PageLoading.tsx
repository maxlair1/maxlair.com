import * as React from 'react';

import BlockLoader from './BlockLoader';
import BarLoader from './BarLoader';

const styles_container = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '0.5rem',
}

const styles_screen = {
    maxWidth: '80ch',
    margin: '0 auto',
    padding: '24px',
}

export interface PageLoadingProps {
    progress: number;
    fullscreen?: boolean;
    label?: string;
}

export default function PageLoading({ progress, fullscreen, label }: PageLoadingProps) {
    return (
        <div style={styles_screen}>
            <div style={styles_container}>
                <div>
                {label ?? 'Loading...'}
                <BlockLoader mode={2}></BlockLoader>
                </div>
                <BarLoader progress={progress} intervalRate={1}></BarLoader>
            </div>
        </div>
    );
}