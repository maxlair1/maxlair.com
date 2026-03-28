'use client';

import * as React from 'react';
import styles from './Skeleton.module.css';
import * as Utilities from '@lib/utilities';

interface SkeletonProps {
    type?: string;
    lines?: number;
    style?: React.CSSProperties;
    preset? : 'paragraph' | 'card' | 'showcase';
}

export default function Skeleton({ type = 'card', lines = 1, style, preset }: SkeletonProps): React.ReactElement { 
    const skeletons = Array.from({ length: lines }, (_, i) => (
        <div
            key={i}
            aria-hidden
            className={Utilities.classNames(styles.root, styles[type])}
            style={style}
        />
    ));

    if (preset === 'paragraph') return (
        <>
            <div
                aria-hidden
                className={Utilities.classNames(styles.root)}
                style={{
                    maxWidth: 'clamp(1rem, 100%, var(--optimal-line-length))',
                    marginBottom: 'var(--size-2)',
                }}
            />
            <div
                aria-hidden
                className={Utilities.classNames(styles.root)}
                style={{
                    maxWidth: 'clamp(1rem, 95%, calc(var(--optimal-line-length) * 0.95))',
                    marginBottom: 'var(--size-2)',
                }}
            />
            <div
                aria-hidden
                className={Utilities.classNames(styles.root)}
                style={{
                    maxWidth: 'clamp(1rem, 65%, calc(var(--optimal-line-length) * 0.65))',
                    marginBottom: 'var(--size-2)',
                }}
            />
            <div
                aria-hidden
                className={Utilities.classNames(styles.root)}
                style={{
                    maxWidth: 'clamp(1rem, 92%, calc(var(--optimal-line-length) * 0.92))',
                    marginBottom: 'var(--size-2)',
                }}
            />
        </>
    );

    if (preset === 'showcase') return (
        <>
            <div
                aria-hidden
                className={Utilities.classNames(styles.root)}
                style={{
                    minHeight: '45rem',
                    width: '100%',
                    marginBottom: 'var(--size-2)',
                }}
            />
        </>
    );
    
    return <>{skeletons}</>;


}