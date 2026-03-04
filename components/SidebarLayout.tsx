'use client';

import styles from '@components/SidebarLayout.module.css';
import * as React from 'react';
import Button from './Button';

interface SidebarLayoutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  children?: React.ReactNode;
  sidebar?: React.ReactNode;
  defaultSidebarWidth?: number;
  isShowingHandle?: boolean;
  isReversed?: boolean;
  grabTab?: boolean;
  collapsed?: boolean;
}

const LINE_HEIGHT = 20;
const CHARACTER_WIDTH = 9.6;

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ 
  defaultSidebarWidth = 20, 
  children, 
  sidebar, 
  isShowingHandle = false, 
  isReversed = false, 
  grabTab = false, 
  collapsed = false,
  ...rest 
}) => {
  const [sidebarWidth, setSidebarWidth] = React.useState(defaultSidebarWidth);
  const [isCollapsed, setIsCollapsed] = React.useState(collapsed);
  const handleRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const startX = event.clientX;
    const startWidth = sidebarWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const increment = Math.round(deltaX / CHARACTER_WIDTH);
      setSidebarWidth(Math.max(CHARACTER_WIDTH, startWidth + increment));
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  if (isReversed) {
    return (
      <div className={styles.root} {...rest}>
        <div className={styles.content}>{children}</div>
        &nbsp;
        <div
          className={styles.sidebar}
          style={{
            width: `${sidebarWidth}ch`,
          }}
        >
          {sidebar}
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.root} ${isCollapsed ? styles.collapsed : ''}`} {...rest}>
      <Button style={{position: 'absolute', margin: '1rem'}} onClick={() => setIsCollapsed(!isCollapsed)}>{isCollapsed ? 'Expand' : 'Collapse'}</Button>
      <div
        className={styles.sidebar}
        style={{
          width: `${sidebarWidth}ch`,
        }}
      >
        <div>
          {sidebar}
        </div>
        {grabTab ? (
          <div className={styles.grabTab}>
            <p>explore</p>
          </div>
        ) : null}
      </div>
        {isShowingHandle ? (
          <div className={styles.handle} ref={handleRef} role="button" tabIndex={0} onMouseDown={handleMouseDown} style={isShowingHandle ? {} : { width: `0.5ch` }}>
            <>
              <div className={styles.line} />
            </>
          </div>
        ) : null}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

const sidebarContext = React.createContext<{
  sidebar: React.ReactNode;
  collapsed: boolean;
}>({
  sidebar: null,
  collapsed: false,
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState({
    sidebar: null,
    collapsed: false,
  });

  return (
    <sidebarContext.Provider value={state}>
      {children}
    </sidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = React.useContext(sidebarContext);
  if (!ctx) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return ctx;
}

export default SidebarLayout;
