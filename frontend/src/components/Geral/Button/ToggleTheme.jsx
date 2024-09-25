import { useContext } from 'react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function ToggleTheme() {
    const { theme, setTheme } = useContext(ThemeContext)

    return (
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className='flex items-center group px-2 py-1'>
            {theme === 'dark' ?
                <LightModeIcon sx={{ width: '16px' }} className='text-neutral-700 group-hover:text-segundaria-900' /> : <DarkModeIcon sx={{ width: '16px' }} className='text-neutral-700 hover:text-black' />
            }
            <span className='text-sm group-hover:text-segundaria-900 font-medium transition duration-300 ease-out ml-2'>
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
        </button>
    );
}

export default ToggleTheme;