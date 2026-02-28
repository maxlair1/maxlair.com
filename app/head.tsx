export default function Head() {
  return (
    <>
      <title>maxlair.com :\)</title>
      <meta name="description" content="Documentation" />
      <link rel="icon" href="/favicon.ico" />
      {/* ENSURES NO FLASH ON THEME CHANGE */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            const cookieMatch = document.cookie.match(/theme=(light|dark)/);
            let theme = cookieMatch ? cookieMatch[1] : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            document.documentElement.dataset.theme = theme;
          `,
        }}
      />
    </>
  );
}