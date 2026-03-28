
'use client';
import { Sun, Moon } from "lucide-react";
import * as React from "react";
import useTheme from "@root/app/lib/theme.provider";
import Skeleton from "@components/Skeleton";
import Button from "@components/Button";


export default function ChangeThemeButton(): React.ReactElement { 
    const { theme: currentTheme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    
    React.useEffect(() => {
        setMounted(true);
    }, []);
    
    if (!mounted) {
        return <><Skeleton type="button"></Skeleton></>;
    }
    
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    return (
        <Button variant="icon" before={
            currentTheme === 'light' ? <Sun/> : <Moon/>
        }
        onClick={() => setTheme(newTheme)}
        >
        </Button>
    )
}