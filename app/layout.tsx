import * as React from 'react';

import '@root/global.css';
import '@root/global-fonts.css';
import styles from '@root/app/layout.module.css';
import { fragmentMono, instrumentSerif, newsreader } from '@root/lib/type';
// import { useParams } from 'next/navigation;

import BreadCrumbs, { type BreadCrumbsItem } from '@root/components/BreadCrumbs';
import Providers from '@components/Providers';
import SidebarLayout from '@root/components/SidebarLayout';
import Explorer from '@root/app/explorer';
import { get } from 'node:http';

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
  // const [breadcrumbs, setBreadcrumbs] = React.useState<BreadCrumbsItem[]>()
  // const params = useParams();
  
  // React.useEffect(() => {
    

  // }, [params])

  return (
    <html lang="en-us">
      <body className={`theme-light ${fragmentMono.variable} ${newsreader.variable} ${instrumentSerif.variable} `}>
        <Providers>
          <main className={styles.main}>
              <SidebarLayout sidebar={<Explorer />} defaultSidebarWidth={30}>
                <div className={styles.content}>
                  {/* <BreadCrumbs items={}></BreadCrumbs> */}
                  {children}
                </div>
              </SidebarLayout>
          </main>
        </Providers>
      </body>
    </html>
  );
}