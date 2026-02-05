import Package from '@root/package.json';

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