import * as React from 'react';

import BlockLoader from './BlockLoader';
import BarLoader from './BarLoader';
import { LoadingQuotes } from '@root/lib/constants';

export interface PageLoadingProps {
    progress: number;
    fullscreen?: boolean;
    label?: string;
    quote?: boolean;
}

const styles_container = {
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '0.5rem',
}

export default function PageLoading({ progress, fullscreen, label, quote = true }: PageLoadingProps) {

    const [selectedQuote, setSelectedQuote] = React.useState<string>(LoadingQuotes[0]);

    React.useEffect(() => {
        setSelectedQuote(LoadingQuotes[Math.floor(Math.random() * LoadingQuotes.length)]);
    }, []);

    return (
        <div style={styles_container}>
            <div>
            {label ?? 'Loading...'}
            <BlockLoader mode={2}></BlockLoader>
            </div>
            <BarLoader progress={progress} intervalRate={1}/>
            <>
            {quote ? selectedQuote : null}
            </>
        </div>
    );
}