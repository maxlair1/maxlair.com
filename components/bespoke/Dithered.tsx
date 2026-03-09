import * as React from 'react';
import Image from 'next/image';

// core package
import * as itp from '@root/app/lib/imageToPixel';

interface DitheredProps {
    src: string;
    alt: string;
    onLoad?: () => void;
}

export default function Dithered({ src, alt, onLoad }: DitheredProps): React.ReactNode {
    const [processing, setProcessing ] = React.useState(true);
    const [dithered, setDithered] = React.useState(null);
    const imgRef = React.useRef<HTMLImageElement>(null);

    const palette = [
        '#ed8641',
        '#ffe1ce',
        '#f6b082',
        '#ed7d31',
        '#321501',
        // '#3a80f5',
    ];

    React.useEffect(() => {
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
            }).catch((error) => {
                console.error('Error during dithering:', error);
            }).finally(() => {
                setProcessing(false);
                onLoad && onLoad();
            });
        };
        dither();
    }, [src])

    return processing ? 
        (<img ref={imgRef} src={src} alt={alt} style={{display: 'none'}}/>)
        : (<Image src={dithered!} alt={alt} fill={true} style={{objectFit: 'cover'}} loading='eager'/>);
}