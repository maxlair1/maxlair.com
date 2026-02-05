import '@root/global.css';
import type { AppProps } from 'next/app';
import * as React from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
