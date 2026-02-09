import Providers from '@components/Providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
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