import {Newsreader, Fragment_Mono} from 'next/font/google';

export const sourceSerif = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
})

export const fragmentMono = Fragment_Mono({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-fragment-mono',
})
