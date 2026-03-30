'use client';

import * as React from 'react';
import styles from './CircularProgress.module.css';

interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value (controls how much the ring is filled) */
  value?: number | null;
  /** Maximum value (e.g. total seconds for countdown) */
  max?: number;
  /** Diameter of the circle in pixels */
  size?: number;
  /** Thickness of the progress ring */
  thickness?: number;
  /** Anything you want to show in the center (e.g. "1/5") */
  children?: React.ReactNode;
  /** Optional label below the circle */
  label?: string;
}

export default function CircularProgress({
  value = null,
  max = 100,
  size = 160,
  thickness = 10,
  children,
  label,
  className = '',
  ...props
}: CircularProgressProps) {
  const safeMax = Math.max(max, 1);
  const progress = value == null ? 0 : Math.min(Math.max(value / safeMax, 0), 1);

  // Better radius calculation to prevent funky rendering
  const radius = (size - thickness) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = circumference * (1 - progress) * -1;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={safeMax}
      aria-valuenow={value ?? undefined}
      className={`${styles.circularProgress} ${className}`}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
        className={styles.indicator}
      >
        {/* Background Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness}
          strokeLinecap="round"
          className={styles.track}
        />

        {/* Progress Arc */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={styles.range}
        />
      </svg>

      {/* Center Content - fully controlled by you */}
      <div className={styles.valueText}>
        {children}
      </div>

      {label && (
        <div className={styles.label}>
          {label}
        </div>
      )}
    </div>
  );
}