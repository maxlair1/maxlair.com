import '@root/global-fonts.css';
import '@root/global.css';

import * as Constants from '@common/constants';
import * as Utilities from '@common/utilities';
import Card from '@components/Card';

import Package from '@root/package.json';
import BreadCrumbs from '@root/components/BreadCrumbs';

export const dynamic = 'force-static';

const breadcrumbsItems = [
  {url: '/', name: 'Home'},
  {url: '/explorer', name: 'Explorer'},
  {url: '/explorer/folder', name: 'Folder'},
]

export async function generateMetadata({ params, searchParams }) {
  const title = Package.name;
  const description = Package.description;
  const url = 'https://maxlair.com';
  const handle = '@maxlair';

  return {
    description,
    icons: {
      apple: [{ url: '/apple-touch-icon.png' }, { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
      icon: '/favicon-32x32.png',
      other: [
        {
          rel: 'apple-touch-icon-precomposed',
          url: '/apple-touch-icon-precomposed.png',
        },
      ],
      shortcut: '/favicon-16x16.png',
    },
    metadataBase: new URL('https://maxlair.com'),
    url,
  };
}

export default async function Page() {
  return (
    <div className='theme-light tint-orange'>
      <BreadCrumbs items={breadcrumbsItems}></BreadCrumbs>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum earum aut accusantium soluta quae minus inventore fugiat, delectus saepe nihil pariatur libero in commodi voluptate beatae quis ipsam voluptatem fuga? Debitis, reprehenderit. Magnam est, quos quis sunt, alias ab officia aut rem perspiciatis aperiam cum debitis. Quasi dolorum in sed!</p>
      <img style={{width: '100%'}} src="/ordered_dither.png" alt="Example image" />
    </div>
  )
}
