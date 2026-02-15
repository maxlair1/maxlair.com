'use client';

import * as React from 'react';

import { ModalProvider } from '@root/components/ref-page/ModalContext';
import { createContext, useState, useContext } from 'react';

const appContext = createContext({});

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <ModalProvider>{children}</ModalProvider>;
};

export default Providers;
