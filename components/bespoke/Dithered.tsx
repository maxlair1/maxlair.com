import * as React from 'react';
import Image from 'next/image';

// core package
import * as itp from '@root/app/lib/imageToPixel';

interface DitheredProps {
    src: string;
    alt: string;
    onProcessed?: () => void;
}

export default function Dithered({ src, alt, onProcessed }: DitheredProps): React.ReactNode {
    const [processing, setProcessing ] = React.useState(true);
    const [cached, setCached] = React.useState<string>('');
    const [dithered, setDithered] = React.useState(null);
    const imgRef = React.useRef<HTMLImageElement>(null);

    const generatePalette = (color: string): string[] => {
        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }  

        console.log(`Parsed color ${color} to RGB:`, hexToRgb(color)); 
        const palette = [];
        return palette;
    }

    const palette = [
        '#ed8641',
        '#ffe1ce',
        '#f6b082',
        '#ed7d31',
        '#321501',
        // '#3a80f5',
    ];

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
        generatePalette('#ed8641');
        const key = getCacheKey(src);
        const cachedImage = localStorage.getItem(key);
        if (cachedImage) {
            setCached(cachedImage);
            return;
        }

        async function dither() {
            if (!imgRef.current) return;
            setProcessing(true);
            console.log(palette);
            await itp.pixelate({
                image: imgRef.current,             // Accepts HTML canvas, image elements, or q5/p5.js image objects
                width: 120,                  // Set pixelation width
                dither: 'Ordered',   // Dithering method ('Floyd-Steinberg', 'Ordered','2x2 Bayer', '4x4 Bayer',`Clustered 4x4` or `atkinson`)
                strength: 5,                // Dithering strength (0-100)
                // palette: 'rgbg-36',        // Optional: Lospec palette slug (depends on Lospec API availability)
                palette: palette,
                resolution: 'original'       // Use 'original' for full resolution, or 'pixel' for pixelated size
            }).then((result) => {
                setDithered(result.toDataURL());
                console.log('Dithering successful');
                localStorage.setItem(key, result.toDataURL());
                console.log('Image cached in localStorage:', result.toDataURL());
            }).catch((error) => {
                console.error('Error during dithering:', error);
            }).finally(() => {
                setProcessing(false);
                onProcessed && onProcessed();
            });
        };
        dither();

    }, [src])

    if (cached) {
        return <Image src={cached} alt={alt} fill={true} style={{objectFit: 'cover'}} loading='eager'/>;
    }

    return processing ? 
        (<img ref={imgRef} src={src} alt={alt} style={{display: 'none'}}/>)
        : (<Image src={dithered!} alt={alt} fill={true} style={{objectFit: 'cover'}} loading='eager'/>);
}