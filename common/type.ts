import {Source_Serif_4} from 'next/font/google';
import localFont from 'next/font/local';

export const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
})

export const dina = localFont({
  src: [
    { path: '../fonts/DinaRemasterII-01.ttf', weight: '100', style: 'normal' },
    { path: '../fonts/DinaRemasterII-Bold-02.ttf', weight: '700', style: 'bold' },
  ],
  variable: '--font-dina',
  display: 'swap',
}); 