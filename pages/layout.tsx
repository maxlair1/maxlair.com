import Providers from '@components/Providers';
import ActionBar from '@root/components/ActionBar';
import actions from '@root/common/actions';
import BreadCrumbs from '@root/components/BreadCrumbs';

const breadcrumbsItems = [
  {url: '/', name: 'Home'},
  {url: '/explorer', name: 'Explorer'},
  {url: '/explorer/folder', name: 'Folder'},
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
