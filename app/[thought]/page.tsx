import * as React from 'react';
import { useParams } from 'next/dist/client/components/navigation';


export default function Page(): React.ReactElement {
    const params = useParams();
    return (
        <div>
            <h1>{params.slug}</h1>
        </div>
    );
}