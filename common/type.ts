import {Source_Serif_4} from 'next/font/google';
import localFont from 'next/font/local';

export const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
})

export const cozette = localFont({
  src: [
    { path: '../fonts/CozetteVector.ttf', style: 'normal' },
  ],

  variable: '--font-cozette',
  display: 'swap',
});
