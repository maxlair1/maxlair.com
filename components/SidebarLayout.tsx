'use client';
import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from '@components/SidebarLayout.module.css';

import { useHotkeys } from '@root/modules/hotkeys';
import PageLoading from '@root/components/PageLoading';
import * as Utilities from '@lib/utilities';
import { CssVariable } from 'next/dist/compiled/@next/font';

/** GOALS FOR STATE PERSISTENCE + SHARING:
 * 1. Use params first and foremost. On load of route, check params, and adjust state accordingly.
 * 2. If params are not present, check for local preferences (localStorage). This allows for state persistence across sessions, but not sharing.
 * 3. If neither params nor local preferences are present, use default state.
 * 
 * When normal navigation and interaction occurs, update params and local preferences in sync. 
 * This ensures that the URL always reflects the current state, allowing for easy sharing, 
 * while also maintaining user preferences for future visits.
 */

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
const SIDEBAR_KEY = 'sidebar';
const LS_KEY = 'sidebar';

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const sidebarParam = searchParams.get("sidebar");
  const isCollapsedFromURL = sidebarParam === "collapsed" ? true : sidebarParam === "expanded" ? false : undefined;

  const [sidebarWidth, setSidebarWidth] = React.useState(defaultSidebarWidth);
  const [isCollapsed, setIsCollapsed] = React.useState<boolean | undefined>(isCollapsedFromURL);
  const [isMobile, setMobile] = React.useState(false);
  const [windowWidth, windowHeight] = useWindowSize();
  const handleRef = React.useRef<HTMLDivElement>(null);

  
  React.useEffect(() => {
    if (isCollapsed !== undefined) return;

    if (isCollapsedFromURL !== undefined) {
      setIsCollapsed(isCollapsedFromURL);
    } else {
      const saved = localStorage.getItem(LS_KEY);
      setIsCollapsed(saved === "collapsed" ? true : saved === "expanded" ? false : true);
    }
  }, [searchParams]);

  React.useEffect(() => {
    if (isCollapsed === undefined) return;

    const value = isCollapsed ? "collapsed" : "expanded";

    localStorage.setItem(LS_KEY, value);

    const params = new URLSearchParams(searchParams.toString());
    if (isCollapsed) {
      params.set(SIDEBAR_KEY, "collapsed");
    } else {
      params.delete(SIDEBAR_KEY);
    }

    const newQuery = params.toString();
    const currentQuery = searchParams.toString();

    if (newQuery !== currentQuery) {
      router.replace(`${pathname}?${newQuery}`, { scroll: false });
    }
  }, [isCollapsed, pathname, router]);

  const toggleSidebar = React.useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);
  
  function useWindowSize() {
    const [size, setSize] = React.useState([0, 0]);
    React.useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  React.useEffect(()=> {
    const breakpoint = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-tablet').trim().replace('px', ''), 10);
    if (windowWidth < breakpoint) {
      console.log('got variable,' + breakpoint);
      setMobile(true);
    }
  }, [windowWidth, windowHeight]);

  useHotkeys('SHIFT+E', toggleSidebar);
  
  if (isCollapsed === undefined) return null; // error if undefined
  
  
  const GrabTab = (
    <div style={{borderRadius: '20px'}} className={styles.grabTabContainer}>
        <div className={styles.grabTab} onClick={toggleSidebar}>
          <p>explore</p>
        </div>
    </div>
  );



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


  const Loading = (): React.ReactElement => {
    return (
      <div className={styles.loading}>
        <PageLoading progress={50} />
      </div>
    );
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
            backgroundColor: 'transparent',
          }}
        >
          {sidebar}
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.root} ${isCollapsed ? styles.collapsed : ''}`} {...rest}>
        <div
          className={styles.sidebar}
          style={
            {
              width: `${sidebarWidth}ch`,
            }
          }
        >
          <div>
            {sidebar}
          </div>
        {grabTab ? GrabTab : null}
        </div>
        {isMobile && isCollapsed === false
         ? (
         <div className={styles.overlay} role='overlay' onClick={toggleSidebar}></div>
        )
          : null}
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
          
export default SidebarLayout;
