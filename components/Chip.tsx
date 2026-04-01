"use client";
import * as React from "react";
import styles from './Chip.module.css';

export default function Chip({icon, body }:{icon?: React.ReactNode, body: string}): React.ReactElement {
    return (
        <div className={styles.root}>
            {icon}
            <span>
                {body}
            </span>
        </div>
    )
}