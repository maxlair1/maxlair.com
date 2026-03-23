import 'server-only';
import { cookies } from 'next/headers';

export async function getInitialTheme(): Promise<'light' | 'dark' | 'system'> {
  const cookieTheme = await cookies().then(c => c.get('theme')?.value);
  if (cookieTheme === 'light' || cookieTheme === 'dark') return cookieTheme;
  return 'system'; // tell client to resolve system preference
}

//OLD:

// 'server only';

// import { cookies } from 'next/headers';

// export default function theme() {
//     const getTheme = async (): Promise<string> => {
//         const cookieTheme = await cookies().then(c => c.get('theme'));
//         if (cookieTheme && (cookieTheme.value === 'light' || cookieTheme.value === 'dark')) {
//             return cookieTheme.value;
//         }
//         if (typeof window === 'undefined') return 'light';
//         const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//         return prefersDark ? 'dark' : 'light';
//     };
    
//     const setTheme = async (newTheme: string) => {
//         cookies()
//             .then(v => v.set('theme', newTheme));
//     };
    
//     const resetTheme = async () => {
//         cookies()
//             .then(v => v.delete('theme'));
//     };

//     return { getTheme, setTheme, resetTheme };
// }
