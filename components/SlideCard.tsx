'use client';

import * as React from 'react';
import CircularProgress from '@components/CircularProgress';


export default function SlideCard() {
    const [progress, setProgress] = React.useState(0);
    const [duration, setDuration] = React.useState(5000);
    

    function AdvanceButton({progress}: {progress: number}) {
    
        React.useEffect(() => {
            const timeout = setTimeout(() => {
                // Simulate progress update
                // In a real application, this would be based on actual progress (e.g., file upload, timer, etc.)
            }, progress);
    
            return () => clearTimeout(timeout);
        },[progress]);
    
        return (
            <button>
                <CircularProgress value={progress} size={24} thickness={4}>
                    <span>{progress}%</span>
                </CircularProgress>
            </button>
        )
    }


    return (
        <>
            <a href="#">
                <AdvanceButton progress={25} />
            </a>
        </>
    )
}