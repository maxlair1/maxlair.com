import * as React from 'react';
import styles from './Skeleton.module.css';
import * as Utilities from '@lib/utilities';

interface SkeletonProps {
    type?: 'card' | 'text' | 'image';
}

export default function Skeleton({type = 'card'}: SkeletonProps): React.ReactElement {
    return (
    <div className={styles.card}>
      <div className={Utilities.classNames[styles.skeleton, styles.image]}></div>

      <div className="content">
        <div className="skeleton title"></div>
        <div className="skeleton text"></div>
        <div className="skeleton text short"></div>
      </div>
    </div>
  );
}