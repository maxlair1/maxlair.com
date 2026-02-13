'use client';

import * as React from 'react';
import DocLoader from '@root/components/DocLoader';

export default function letsRead({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = React.use(params);
    return <DocLoader docSlug={slug} />;
}