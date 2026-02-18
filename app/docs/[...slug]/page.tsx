'use client';

import * as React from 'react';
import DocLoader from '@root/components/DocLoader';

export default function letsRead({ params }: { params: Promise<{ slug: string[] }> }) {
    // 1.save slug to array
    // 2. get # of items, join all with / except last
    // 3. save last as slug, and joined as path
    
    const { slug } = React.use(params);
    const docSlug = slug[slug.length - 1];
    const pathOmitSlug = (slug.slice(0, slug.length - 1)).join('/') + (slug.length <= 1 ? '' : '/')
    
    // console.log('slug:', slug);
    // console.log('docSlug:', docSlug);
    // console.log('pathOmitSlug:', pathOmitSlug);

    return <DocLoader docRelativePath={pathOmitSlug} docSlug={docSlug}/>;
}