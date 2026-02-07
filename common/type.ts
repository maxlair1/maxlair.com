import localFont from 'next/font/local';

export const dina = localFont({
  src: [
    { path: '../fonts/DinaRemasterII-01.ttf', weight: '400', style: 'normal' },
    { path: '../fonts/DinaRemasterII-Bold-02.ttf', weight: '400', style: 'bold' },
  ],
  variable: '--font-dina'
});