'use client';

import * as React from 'react';
import DocLoader from '@root/components/bespoke/DocLoader';

export default function letsRead({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = React.use(params);
    const path = slug.join('/');

    return <DocLoader path={path}/>;
}