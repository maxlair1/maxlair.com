import Providers from '@components/Providers';
import ActionBar from '@root/components/ActionBar';
import actions from '@root/common/actions';
import BreadCrumbs from '@root/components/BreadCrumbs';

const breadcrumbsItems = [
  {url: '/', name: 'Home'},
  {url: '/explorer', name: 'Explorer'},
  {url: '/explorer/folder', name: 'Folder'},
]

const TopBar:React.FC = () => {
  return (
    <header>
      <ActionBar items={actions} />
      <BreadCrumbs items={breadcrumbsItems}></BreadCrumbs>
    </header>
  )
}

const Footer:React.FC = () => {
  return (
    <footer>
      Footer
    </footer>
  )
}


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-us">
      <body className="theme-light tint-orange">
        <Providers>
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

export function ExplorerLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-us">
      <body className="theme-dark tint-orange">
        <Providers>
          <TopBar />
            <div>
              <main>{children}</main>
            </div>
          <Footer />
          </Providers>
      </body>
    </html>
  );
}
