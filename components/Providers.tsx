'use client';

import * as React from 'react';

import { ModalProvider } from '@root/components/ref-page/ModalContext';
import { createContext, useState, useContext } from 'react';
import { DocsProvider } from '@root/contexts/DocsContext';

const appContext = createContext({});

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ModalProvider>
      <DocsProvider>
        {children}
      </DocsProvider>
    </ModalProvider>
    );
};

export default Providers;
