import * as React from 'react';

import '@root/global.css';
import '@root/global-fonts.css';
import styles from '@root/app/layout.module.css';
import Button from '@components/Button';
import { fragmentMono, sourceSerif4 } from '@root/app/lib/type';
import { getInitialTheme } from './lib/theme.server';

import Providers from '@components/Providers';
import SidebarLayout, { useSidebar} from '@root/components/SidebarLayout';
import Explorer from '@root/app/explorer';

export const metadata = {
  title: 'MaxLair Documentation',
  description: 'Documentation site',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
};

export interface RootLayoutProps {
  children: React.ReactNode;
  sidebarExpanded?: boolean;
}

export default async function ExploreLayout({ children }: RootLayoutProps) {
  const initialTheme = await getInitialTheme();

  return (
    <html lang="en-us" data-theme={initialTheme === 'system' ? 'light' : initialTheme}>
      <body className={`theme-light tint-orange ${fragmentMono.variable} ${sourceSerif4.variable} `}>
        <Providers theme={initialTheme}>
          <main className={styles.main}>
              <SidebarLayout sidebar={<Explorer />} defaultSidebarWidth={30} collapsed={true} isShowingHandle={true} grabTab>
                <div className={styles.content}>
                  {children}
                </div>
              </SidebarLayout>
          </main>
        </Providers>
      </body>
    </html>
  );
}