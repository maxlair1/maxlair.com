import * as React from 'react';
import { cookies } from 'next/headers';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
    theme: Theme | undefined;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextType>({
    theme: undefined,
    setTheme: () => {},
});

export function useThemeProvider({children}: {children: React.ReactNode }) {
    const [theme, setTheme] = React.useState<Theme>();
    const cookieStore = cookies(); 
    
    const getTheme = async (): Promise<Theme> => {
        
        //check prefs in cookies
        if (theme && (theme.value === 'light' || theme.value === 'dark')) {
            return theme.value as Theme;
        }
        //check colorscheme
        if (typeof window === 'undefined') return 'light';
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    };

    React.useEffect(() => {
        getTheme().then(setTheme);
    }, []);

    React.useEffect(() => {
        
    },[])
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}