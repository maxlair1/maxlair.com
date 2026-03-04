'use client';

import * as React from 'react';

import { ModalProvider } from '@root/components/ref-page/ModalContext';
import { createContext, useState, useContext } from 'react';
import { ContentProvider } from '@root/app/content/useContent';
import { ThemeProvider } from '@root/app/lib/theme.provider';
import { SidebarProvider } from './SidebarLayout';

const appContext = createContext({});

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps & { theme: any, onThemeChange?: (theme: string) => void }> = ({ children, theme, onThemeChange }) => {
  return (
    <ThemeProvider initialTheme={theme}>
      <ModalProvider>
          <ContentProvider>
            <SidebarProvider>
              {children}
            </SidebarProvider>
          </ContentProvider>
      </ModalProvider>
    </ThemeProvider>
    );
};

export default Providers;
