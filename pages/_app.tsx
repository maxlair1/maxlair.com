import '@root/global.css';
import { dina } from '@common/type';
import type { AppProps } from 'next/app';

import * as React from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={dina.className}>
      <Component {...pageProps} />
    </div>
  );
}
