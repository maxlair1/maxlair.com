'use client';

import styles from '@components/Table.module.css';

import * as React from 'react';

type TableProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

const Table = ({ children, ...rest }: TableProps) => {
  return (
    <div className={styles.wrapper}>
      <table className={styles.root} {...rest}>
        <tbody className={styles.body}>{children}</tbody>
      </table>
    </div>
  );
};

Table.displayName = 'Table';

export default Table;
