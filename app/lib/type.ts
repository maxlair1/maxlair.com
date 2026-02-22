import {Newsreader, Instrument_Serif, Fragment_Mono} from 'next/font/google';

export const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
})

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
})

export const fragmentMono = Fragment_Mono({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-fragment-mono',
})
