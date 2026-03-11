import {Fragment_Mono, Source_Serif_4, Courier_Prime, Source_Code_Pro} from 'next/font/google';

export const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif-4',
})

export const fragmentMono = Fragment_Mono({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-fragment-mono',
})

export const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-source-code-pro',
})

/**
 *  TODO:
 *  - allow font change. Perhaps some of the following:
 *    - Cascadia Mono
 *    - Courier Prime
 *    - 
 * 
 */

