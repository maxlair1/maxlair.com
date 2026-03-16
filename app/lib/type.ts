import {Instrument_Sans, Baskervville, Archivo, Instrument_Serif, Source_Code_Pro} from 'next/font/google';

export const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-source-code-pro',
})

export const baskervville = Baskervville({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-baskervville',
})

export const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-instrument-sans',
})

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-instrument-serif',
})

export const archivo = Archivo({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-archivo',
})

/**
 *  TODO:
 *  - allow font change. Perhaps some of the following:
 *    - Cascadia Mono
 *    - Courier Prime
 */

