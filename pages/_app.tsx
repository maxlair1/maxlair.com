import '@root/global.css';
import { cozette } from '@common/type';
import type { AppProps } from 'next/app';

import * as React from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={cozette.className}>
      <Component {...pageProps} />
    </div>
  );
}
