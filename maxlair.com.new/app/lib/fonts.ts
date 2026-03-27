import { Hanken_Grotesk, Libre_Baskerville } from "next/font/google";

export const hankenGrotesk = Hanken_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-hanken-grotesk',
})

export const LibreBaskerville = Libre_Baskerville({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-libre-baskerville',
})



