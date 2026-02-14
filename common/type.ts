import {Source_Serif_4, Fragment_Mono} from 'next/font/google';
import localFont from 'next/font/local';

export const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
})

export const fragmentMono = Fragment_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-fragment-mono',
})

export const cozette = localFont({
  src: [
    { path: '../fonts/CozetteVector.ttf', style: 'normal' },
  ],

  variable: '--font-cozette',
  display: 'swap',
});
