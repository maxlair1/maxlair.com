import '@root/global.css';
import '@root/global-fonts.css';
import styles from '@root/app/layout.module.css';
import { cozette, fragmentMono } from '@root/common/type';

import Providers from '@components/Providers';
import SidebarLayout from '@root/components/SidebarLayout';
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

export default function ExploreLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en-us">
      <body className={`theme-light ${styles.body} ${fragmentMono.className}`}>
        <Providers>
          <main className={styles.main}>
              <SidebarLayout sidebar={<Explorer />} defaultSidebarWidth={30}>
                {children}
              </SidebarLayout>
          </main>
        </Providers>
      </body>
    </html>
  );
}