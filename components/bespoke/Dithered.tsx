'use client';

import * as React from 'react';
import Image from 'next/image';
import * as Utilities from '@lib/utilities';

// core package
import * as itp from '@root/app/lib/imageToPixel';

interface DitheredProps {
    src: string;
    alt: string;
    onProcessed?: () => void;
    color: [r:number,g:number,b:number];
}

export default function Dithered({ src, alt, onProcessed, color }: DitheredProps): React.ReactNode {
    const [processing, setProcessing ] = React.useState(true);
    const [imgLoaded, setImgLoaded] = React.useState(false);
    const [cached, setCached] = React.useState<string>('');
    const [dithered, setDithered] = React.useState<string | null>(null);
    const imgRef = React.useRef<HTMLImageElement>(null);

    function generateTintShadePalette(baseRgb: [number, number, number]): string[] {
    const [r, g, b] = baseRgb;
    const { h: baseHue, s: baseSat, l: baseLight } = Utilities.rgbToHsl(r, g, b);

    // Use increments above and below baseLight, clamped between 0 and 1
    const palette = [
        Utilities.hslToHex(baseHue, baseSat, Math.max(baseLight - 0.25, 0)), // darkest
        Utilities.hslToHex(baseHue, baseSat, Math.max(baseLight - 0.15, 0)),
        Utilities.hslToHex(baseHue, baseSat, Math.max(baseLight - 0.05, 0)),
        Utilities.hslToHex(baseHue, baseSat, baseLight),                     // base
        Utilities.hslToHex(baseHue, baseSat, Math.min(baseLight + 0.05, 1)),
        Utilities.hslToHex(baseHue, baseSat, Math.min(baseLight + 0.15, 1)),
        Utilities.hslToHex(baseHue, baseSat, Math.min(baseLight + 0.25, 2)), // brightest
    ];

    console.log("Generated palette:", palette);
    return palette;
}

    function getCacheKey(src: string): string {
        let hash = 0;
        for (let i = 0; i < src.length; i++) {
            const char = src.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0; // Convert to 32bit integer
        }
        return `dithered-v1:${hash.toString(36)}`;   // short alphanumeric key
    }

    React.useEffect(() => {
        if (!src) return;
        const key = getCacheKey(src);
        const cachedImage = localStorage.getItem(key);
        if (cachedImage) {
            setCached(cachedImage);
            return;
        }
        // Wait for image to load
        if (!imgLoaded || !imgRef.current) return;
        async function dither(baseColor) {
            setProcessing(true);
            await itp.pixelate({
                image: imgRef.current,
                width: 200,
                dither: '4x4 Bayer',
                strength: 6,
                palette: generateTintShadePalette(baseColor),
                resolution: 'pixelated'
            }).then((result) => {
                setDithered(result.toDataURL());
                localStorage.setItem(key, result.toDataURL());
            }).catch((error) => {
                console.error('Error during dithering:', error);
            }).finally(() => {
                setProcessing(false);
                onProcessed && onProcessed();
            });
        }
        dither(color);
    }, [src, imgLoaded]);

    if (!src) return null;
    if (cached) {
        return <Image src={cached} alt={alt} fill={true} style={{objectFit: 'cover'}} loading='eager' className='pixelated' unoptimized={true}/>;
    }
    // Only render <img> if src is valid
    if (processing) {
        return <img ref={imgRef} src={src} alt={alt} style={{display: 'none'}} onLoad={() => setImgLoaded(true)} />;
    }
    // Only render <Image> if dithered is valid
    if (dithered) {
        return <Image src={dithered} alt={alt} fill={true} style={{objectFit: 'cover'}} loading='eager' className='pixelated' unoptimized={true}/>;
    }
    return null;
}
