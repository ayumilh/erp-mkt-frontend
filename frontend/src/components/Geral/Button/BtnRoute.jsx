'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import { tv } from 'tailwind-variants';

const a = tv({
  base: 'cursor-pointer overflow-hidden font-medium',
  variants: {
    size: {
      full: 'w-full',
      dropdown: 'w-full',
    },
    text: {
      base: 'text-start text-neutral-700 dark:text-gray-300',
      dropdown: 'transition duration-300 ease-in-out dark:text-gray-300',
    }
  },
});

const button = tv({
  base: 'flex',
  variants: {
    type: {
      dropdown: 'w-full flex px-4 py-2 text-start text-sm text-neutral-700 font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 rounded-sm transition duration-300 ease-in-out',
      base: 'px-2 hover:border-b-2 items-center hover:border-gray-300 transform focus:-translate-y-0.5 focus:scale-60 transition duration-300 ease-in-out',
    },
  },
});

const BtnRoute = ({ route, size, btn, txt, activePage = false, children }) => {
  const router = useRouter();
  const [loadingRouting, setLoadingRouting] = useState(false);

  const handleRouting = () => {
    setLoadingRouting(true);
    setTimeout(() => {
      try {
        router.push(route);
      } catch (error) {
        console.error('An error occurred while routing:', error);
      } finally {
        setLoadingRouting(false);
      }
    }, 1000);
  };

  return (
    <button 
      onClick={handleRouting} 
      className={`${button({ type: btn })} ${activePage ? 'border-b-2 border-segundaria-900' : ''}`} 
      role="menuitem"
      style={btn === 'base' ? { textOverflow: 'ellipsis', whiteSpace: 'nowrap' } : {}}
    >
      <a href={route} className={a({ size: size, text: txt })}>
        {loadingRouting 
          ? <CircularProgress color="inherit" className="text-segundaria-900" size={12} /> 
          : children
        }
      </a>
    </button>
  );
};

export default BtnRoute;