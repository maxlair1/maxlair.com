'use client';

import styles from '@components/Drawer.module.css';

import * as React from 'react';

interface DrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  children?: React.ReactNode;
  defaultValue?: boolean;
  isReversed?: boolean;
}

const Drawer: React.FC<DrawerProps> = ({ children, defaultValue = false, isReversed = false, ...rest }) => {
  const [expand, setExpand] = React.useState<boolean>(defaultValue);

  if (isReversed) {
    return (
      <div className={styles.root} {...rest}>
        <div className={styles.right}>
          <button className={styles.action} onClick={() => setExpand(!expand)}>
            {expand ? '⭢' : '⭠'}
          </button>
        </div>
        {expand ? <div className={styles.side}>{children}</div> : null}
      </div>
    );
  }

  return (
    <div className={styles.root} {...rest}>
      {expand ? <div className={styles.side}>{children}</div> : null}
      <div className={styles.right}>
        <button className={styles.action} onClick={() => setExpand(!expand)}>
          {expand ? '⭠' : '⭢'}
        </button>
      </div>
    </div>
  );
};

export default Drawer;
