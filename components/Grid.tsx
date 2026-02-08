import styles from '@components/Grid.module.css';

import * as React from 'react';
import { Children, cloneElement } from 'react';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({ children, ...rest }) => {
  return (
    <div className={styles.grid} {...rest}>
      {children}
    </div>
  );
};

export default Grid;
