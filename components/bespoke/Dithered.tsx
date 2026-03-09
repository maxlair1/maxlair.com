import * as React from 'react';
import Image from 'next/image';

// core package
import * as itp from '@root/app/lib/imageToPixel';

interface DitheredProps {
    src: string;
    alt: string;
}

export default function Dithered({ src, alt }: DitheredProps): React.ReactNode {
    const [processing, setProcessing ] = React.useState(true);
    const [dithered, setDithered] = React.useState(null);
    const imgRef = React.useRef<HTMLImageElement>(null);

    React.useEffect(() => {
        async function dither() {
            if (!imgRef.current) return;
            setProcessing(true);
            await itp.pixelate({
                image: imgRef.current,             // Accepts HTML canvas, image elements, or q5/p5.js image objects
                width: 128,                  // Set pixelation width
                dither: 'Floyd-Steinberg',   // Dithering method ('Floyd-Steinberg', 'Ordered','2x2 Bayer', '4x4 Bayer',`Clustered 4x4` or `atkinson`)
                strength: 20,                // Dithering strength (0-100)
                //palette: 'rgbg-36',        // Optional: Lospec palette slug (depends on Lospec API availability)
                //Recommended: Define a custom palette //  // You can also set `palette: null,` to use the colors from your original image //
                palette: [ 
                    '#1b1b1e', '#f4f1de', '#e07a5f',
                    '#3d405b', '#81b29a', '#f2cc8f',
                    '#8d5a97', '#ef3054'
                ],
                resolution: 'original'       // Use 'original' for full resolution, or 'pixel' for pixelated size
            }).then((result) => {
                setDithered(result.toDataURL());
            }).catch((error) => {
                console.error('Error during dithering:', error);
            }).finally(() => {
                setProcessing(false);
            });
        };
        dither();
    }, [src])

    return processing ? 
        (<img ref={imgRef} src={src} alt={alt} />)
        : (<Image src={dithered!} alt={alt} fill={true} style={{objectFit: 'cover'}} loading='eager'/>);
}