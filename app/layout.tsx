import styles from '@root/app/layout.module.css';

import Providers from '@components/Providers';
import SidebarLayout from '@root/components/SidebarLayout';
import Explorer from '@root/pages/explorer';

export default function RootLayout({ children }: { children: React.ReactNode, sidebar: React.ReactNode }) {
  return (
    <html lang="en-us">
      <body className={`theme-dark tint-orange ${styles.body}`}>
        <Providers>
          <main className={styles.main}>
              <SidebarLayout sidebar={<Explorer  />} defaultSidebarWidth={30}>
                {children}
              </SidebarLayout>
          </main>
          <footer className={styles.footer}>
            <p>Footer content goes here</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}