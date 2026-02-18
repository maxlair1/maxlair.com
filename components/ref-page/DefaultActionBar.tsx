'use client';

import styles from '@components/page/DefaultActionBar.module.css';

import * as React from 'react';
import * as Utilities from '@lib/utilities';

import { toggleDebugGrid } from '@components/DebugGrid';
import { useHotkeys } from '@modules/hotkeys';

import ActionBar from '@components/ActionBar';
import ButtonGroup from '@components/ButtonGroup';

function isElement(target: EventTarget | null): target is Element {
  return target instanceof Element;
}

function isHTMLElement(target: EventTarget | null): target is HTMLElement {
  return target instanceof HTMLElement;
}

const findFocusableParent = (element: Element | null): Element | null => {
  while (element) {
    element = element.parentElement;
    if (element && Utilities.isFocusableElement(element)) {
      return element;
    }
  }
  return null;
};

const findNextFocusableSibling = (element: Element, direction: 'next' | 'previous'): HTMLElement | null => {
  let sibling = direction === 'next' ? element.nextElementSibling : element.previousElementSibling;

  while (sibling) {
    if (Utilities.isFocusableElement(sibling)) {
      return sibling as HTMLElement;
    }

    const focusableDescendant = Utilities.findFocusableDescendant(sibling, null, direction);
    if (focusableDescendant) {
      return focusableDescendant;
    }

    sibling = direction === 'next' ? sibling.nextElementSibling : sibling.previousElementSibling;
  }

  return null;
};

const findNextFocusableAncestor = (element: Element, direction: 'next' | 'previous'): HTMLElement | null => {
  let ancestor = element.parentElement;

  while (ancestor) {
    const nextFocusable = findNextFocusableSibling(ancestor, direction);
    if (nextFocusable) {
      return nextFocusable;
    }
    ancestor = ancestor.parentElement;
  }

  return null;
};

const useGlobalNavigationHotkeys = () => {
  const onHandleSubmit = (event: KeyboardEvent) => {
    const target = event.target;
    if (Utilities.isFocusableElement(target)) {
      event.preventDefault();
      (target as HTMLElement).click();
    }
  };

  const onHandleNextFocus = (event: KeyboardEvent) => {
    const target = event.target;

    if (Utilities.isFocusableElement(target)) {
      event.preventDefault();

      const nextFocusable = Utilities.findNextFocusable(target as Element, 'next');
      if (nextFocusable) {
        nextFocusable.focus();
      }
    }
  };

  const onHandlePreviousFocus = (event: KeyboardEvent) => {
    const target = event.target;

    if (Utilities.isFocusableElement(target)) {
      event.preventDefault();

      const previousFocusable = Utilities.findNextFocusable(target as Element, 'previous');
      if (previousFocusable) {
        previousFocusable.focus();
      }
    }
  };

  useHotkeys('ArrowDown', onHandleNextFocus);
  useHotkeys('ArrowUp', onHandlePreviousFocus);
  useHotkeys('ArrowRight', onHandleNextFocus);
  useHotkeys('ArrowLeft', onHandlePreviousFocus);
  useHotkeys('Enter', onHandleSubmit);
  useHotkeys(' ', onHandleSubmit);
};

interface DefaultActionBarProps {
  items?: {
    hotkey: string;
    onClick: () => void;
    body: React.ReactNode;
    items?: any;
  }[];
}

const DefaultActionBar: React.FC<DefaultActionBarProps> = ({ items = [] }) => {
  const [isGrid, setGrid] = React.useState(false);
  useHotkeys('ctrl+g', () => toggleDebugGrid());

  useGlobalNavigationHotkeys();

  React.useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (e: MediaQueryList | MediaQueryListEvent) => {
      if (e.matches) {
        Utilities.onHandleAppearanceChange('theme-dark');
      } else {
        Utilities.onHandleAppearanceChange('');
      }
    };

    applyTheme(prefersDark);

    prefersDark.addEventListener('change', applyTheme);

    return () => {
      prefersDark.removeEventListener('change', applyTheme);
    };
  }, []);

  return (
    <div className={styles.root}>
      <ActionBar
        items={[
         
          {
            hotkey: '⌃+A',
            body: 'Appearance',
            openHotkey: 'ctrl+a',
            items: [
              {
                icon: '⊹',
                children: 'Light',
                onClick: () => Utilities.onHandleAppearanceChange(''),
              },
              {
                icon: '⊹',
                children: 'Dark',
                onClick: () => Utilities.onHandleAppearanceChange('theme-dark'),
              },
            ],
          },
          {
            hotkey: '⌃+T',
            body: 'Mode',
            openHotkey: 'ctrl+t',
            items: [
              {
                icon: '⊹',
                children: 'None',
                onClick: () => Utilities.onHandleAppearanceModeChange(''),
              },
              {
                icon: '⊹',
                children: 'Blue',
                onClick: () => Utilities.onHandleAppearanceModeChange('tint-blue'),
              },
              {
                icon: '⊹',
                children: 'Green',
                onClick: () => Utilities.onHandleAppearanceModeChange('tint-green'),
              },
              {
                icon: '⊹',
                children: 'Orange',
                onClick: () => Utilities.onHandleAppearanceModeChange('tint-orange'),
              },
              {
                icon: '⊹',
                children: 'Purple',
                onClick: () => Utilities.onHandleAppearanceModeChange('tint-purple'),
              },
              {
                icon: '⊹',
                children: 'Red',
                onClick: () => Utilities.onHandleAppearanceModeChange('tint-red'),
              },
              {
                icon: '⊹',
                children: 'Yellow',
                onClick: () => Utilities.onHandleAppearanceModeChange('tint-yellow'),
              },
              {
                icon: '⊹',
                children: 'Pink',
                onClick: () => Utilities.onHandleAppearanceModeChange('tint-pink'),
              },
            ],
          },
          {
            hotkey: '⌃+G',
            onClick: () => {
              toggleDebugGrid();
            },
            body: 'Grid',
            selected: false,
          },
          ...items,
        ]}
      />
    </div>
  );
};

export default DefaultActionBar;
