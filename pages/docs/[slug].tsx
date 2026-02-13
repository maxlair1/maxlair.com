import * as React from 'react';
import { useRouter } from 'next/router';
import DocLoader from '../DocLoader';

export default function letsRead() {
    const router = useRouter();
    const { slug } = router.query;

    console.log('slug:', slug);
    return <DocLoader docSlug={slug as string} />;
}