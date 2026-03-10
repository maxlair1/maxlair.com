'use client';

import styles from '@components/SidebarLayout.module.css';
import * as React from 'react';
import { useHotkeys } from '@root/modules/hotkeys';

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
  collapsed,
  ...rest 
}) => {
  const [sidebarWidth, setSidebarWidth] = React.useState(defaultSidebarWidth);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  useHotkeys('SHIFT+E', () => {
    setIsCollapsed((prev) => !prev);
  });

  // React.useEffect(() => {
  //   console.log('Sidebar collapsed state:', isCollapsed);
  //   localStorage.setItem('sidebarState', !isCollapsed ? 'collapsed' : 'expanded');
  // }, [isCollapsed]);

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

  const GrabTab = (
    <div style={{borderRadius: '20px'}}>
        <div className={styles.grabTab} onClick={()=> setIsCollapsed((prev) => !prev)}>
          <p>explore</p>
        </div>
    </div>
  );


  if (isReversed) {
    return (
      <div className={styles.root} {...rest}>
        <div className={styles.content}>{children}</div>
        &nbsp;
        <div
          className={styles.sidebar}
          style={{
            width: `${sidebarWidth}ch`,
            backgroundColor: 'transparent',
          }}
        >
          {sidebar}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`${styles.root} ${isCollapsed ? styles.collapsed : ''}`} {...rest}>
        <div
          className={styles.sidebar}
          style={{
            width: `${sidebarWidth}ch`,
          }}
        >
          <div>
            {sidebar}
          </div>
        </div>
          {isShowingHandle ? (
            <div className={styles.handle} ref={handleRef} role="button" tabIndex={0} onMouseDown={handleMouseDown} style={isShowingHandle ? {} : { width: `0.5ch` }}>
              <>
                <div className={styles.line} />
              </>
            </div>
          ) : null}
        <div>
          {grabTab ? GrabTab : null}
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};

const sidebarContext = React.createContext<{
  collapsed: boolean;
  toggleSidebar: () => void;
}>({
  collapsed: false,
  toggleSidebar: () => {},
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState({collapsed: false});

  const toggleSidebar = () => {
    setState((prev) => ({ ...prev, collapsed: !prev.collapsed }));
  };

  return (
    <sidebarContext.Provider value={{ ...state, toggleSidebar }}>
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
