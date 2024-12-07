'use client'
import { useEffect, useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { ThemeMuiContext } from '../../../contexts/ThemeMuiContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function ToggleTheme() {
    const { theme, setTheme } = useContext(ThemeContext);
    const { themeMode, toggleTheme } = useContext(ThemeMuiContext);
    
    const handleToggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        toggleTheme();
        window.localStorage.setItem('color-theme', newTheme);
    };

    useEffect(() => {
        const storedTheme = window.localStorage.getItem('color-theme');
        if (storedTheme && storedTheme !== theme) {
          setTheme(storedTheme);
        }
      }, [theme, setTheme]);

    return (
        <button onClick={handleToggleTheme} className='flex rounded-full items-center group hover:bg-segundaria-200 px-2 py-1'>
            {theme === 'light' ? (
                <LightModeIcon fontSize='small' className='mr-2 text-neutral-700 dark:text-gray-300 group-hover:text-segundaria-900 transition duration-300 ease-out' />
            ) : (
                <DarkModeIcon fontSize='small' className='mr-2 text-neutral-700 dark:text-gray-300 group-hover:text-segundaria-900 transition duration-300 ease-out' />
            )}
            <span className='text-sm dark:text-gray-200 font-medium group-hover:text-segundaria-900 transition duration-300 ease-out'>
                {theme === 'dark' ? 'Modo escuro' : 'Modo claro'}
            </span>
        </button>
    );
}

export default ToggleTheme;