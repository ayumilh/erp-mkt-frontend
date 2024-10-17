'use client'
import { useEffect } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function ToggleTheme() {
    const { theme, setTheme } = useContext(ThemeContext);
    
    const handleToggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        window.localStorage.setItem('color-theme', newTheme);
    };

    useEffect(() => {
        const storedTheme = window.localStorage.getItem('color-theme');
        if (storedTheme && storedTheme !== theme) {
          setTheme(storedTheme);
        }
      }, [theme, setTheme]);

    return (
        <button onClick={handleToggleTheme} className='flex h-12 lg:h-auto items-center group px-4 lg:px-2 py-1'>
            {theme === 'light' ? (
                <LightModeIcon className='w-8 lg:w-4 text-neutral-700 dark:text-gray-300 group-hover:text-segundaria-900' />
            ) : (
                <DarkModeIcon className='w-8 lg:w-6 text-neutral-700 dark:text-gray-300 group-hover:text-segundaria-900' />
            )}
            <span className='lg:hidden lg:text-sm dark:text-gray-200 group-hover:text-segundaria-900 font-medium transition duration-300 ease-out ml-2'>
                {theme === 'dark' ? 'Modo escuro' : 'Modo claro'}
            </span>
        </button>
    );
}

export default ToggleTheme;