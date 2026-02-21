import Link from 'next/link';
import * as React from 'react';

export default function Me():React.ReactNode {
    return (
        <>
            <Link href="/me/tools">
                Tools
            </Link>
        </>
    )
}