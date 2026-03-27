'use client';

import styles from '@components/Accordion.module.css';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';
import * as Utilities from '@root/app/lib/utilities';

import Row from '@components/Row';

interface AccordionProps {
  defaultValue?: boolean;
  title: string;
  children?: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ 
  defaultValue = false, 
  title, 
  children 
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(defaultValue);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.accordion}>
      {/* Header */}
      <Row 
        className={Utilities.classNames(styles.header, isOpen && styles.open)}
        onClick={toggle}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
      >
        <span className={styles.title}>{title}</span>
        <ChevronDown 
          className={Utilities.classNames(styles.icon, isOpen && styles.iconOpen)} 
        />
      </Row>

      {/* Content */}
      <div 
        className={Utilities.classNames(styles.content, isOpen && styles.contentOpen)}
      >
        {children}
      </div>
      <div className={Utilities.classNames(styles.divider, isOpen && styles.dividerOpen)} />
    </div>
  );
};

export default Accordion;