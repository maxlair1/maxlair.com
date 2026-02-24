'use client';

import * as React from 'react';
import meta from './meta.json' assert { type: 'json' };
import Layout from './layout';
import useContent from '../useContent';

const metadata = meta;

export default function Stuff() {
    const { images, loading } = useContent();
    const [imagesList, setImagesList] = React.useState<any[] | undefined>();

    React.useEffect(() => {
        (async () => {
            console.log('images:', images);
            setImagesList(images ?? undefined)
        })();
    },[loading, images]);

    return (
        <Layout>
            <div style={{display: 'flex', gap: '2ch', flexWrap: 'wrap'}}>
                {imagesList === undefined ? <>Loading...</> : imagesList.map(img => {
                    return(
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <img src={img.download_url} alt="test" width={150} key={img.name}/>
                        </div>
                    ) 
                })}
            </div>
        </Layout>
    )
    
}
