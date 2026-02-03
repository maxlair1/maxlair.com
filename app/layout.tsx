import Providers from '@components/Providers';
import ActionBar from '@root/components/ActionBar';
import siteActions from '@root/common/siteActions';
import SidebarLayout from '@root/components/SidebarLayout';
import ExplorerPage from './explorer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-us">
      <body className="theme-dark tint-orange">
        <Providers>
          <header>
            <ActionBar items={siteActions} />
          </header>
            <SidebarLayout isShowingHandle={true} defaultSidebarWidth={50} children={children} sidebar={<ExplorerPage />} />
            {/* {children} */}
          <footer></footer>
          </Providers>
      </body>
    </html>
  );
}
