
'use client';
import { Sun, Moon } from "lucide-react";
import * as React from "react";
import useTheme from "@root/app/lib/theme.provider";


export default function ChangeThemeButton(): React.ReactElement { 
    const { theme: currentTheme, setTheme } = useTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    return (
        <button onClick={() => setTheme(newTheme)}>
            {currentTheme === 'light' ? <Sun/> : <Moon/>}
        </button>
    )
}