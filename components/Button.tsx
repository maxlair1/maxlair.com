'use client';

import React from 'react';
import styles from './Button.module.css';
import { SquareDashed } from 'lucide-react';
import * as Utilities from '@lib/utilities';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  text?: string;
  before?: React.ReactNode;
  after?: React.ReactNode;
  variant?: 'icon' | 'default';
  size?: 'small' | 'default' | 'large';
  inline?: boolean;
  isLoading?: boolean;
  hugContent?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  children,
  text = 'Press me!',
  before,
  after,
  variant = "default",
  size = 'default',
  inline = false,
  isLoading = false,
  className = '',
  disabled,
  hugContent = false,
  onClick,
  ...props
}: ButtonProps) {

  const buttonClasses = Utilities.classNames(
    styles.button,
    styles[size],
    inline && styles.inline,
    hugContent && styles.hugContent,
    className
)

  const showText = variant === 'default';

  return (
      <button
        type="button"
        className={buttonClasses}
        disabled={disabled || isLoading}
        aria-label={props['aria-label'] || (typeof (children || text) === 'string' ? (children || text) as string : 'Button')}
        tabIndex={0}
        onClick={onClick}
        {...props}
        >
        {/* Left Icon */}
        {before !== undefined ? (
            <span className={styles.iconContainer}>
                {isLoading ? (
                    <div className={styles.spinner} />
                ) : (
                    before
                )}
            </span>
        ): null}

        {/* Text */}
        {showText && <span className={styles.text}>{children || text}</span>}

        {/* Right Icon */}
        {after !== undefined ? (
            <span className={styles.iconContainer}>
                {after}
            </span>
        ): null}
      </button>
  );
}