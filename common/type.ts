import {Newsreader, Fragment_Mono} from 'next/font/google';
import localFont from 'next/font/local';

export const newsReader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
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
