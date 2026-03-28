'use client';

import * as React from 'react';

import { ThemeProvider } from '@root/app/lib/theme.provider';
import { LucideProvider } from 'lucide-react';

export default function Providers({
    children, theme
}:{
    theme: 'system' | 'light' | 'dark', 
    children: React.ReactNode
}) {
    return (
        <ThemeProvider initialTheme={theme}>
            <LucideProvider size={18} strokeWidth={1.5}>
                {children}
            </LucideProvider>
        </ThemeProvider>
    )
}
