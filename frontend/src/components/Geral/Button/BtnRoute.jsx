'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import { tv } from 'tailwind-variants';

const a = tv({
  base: 'hover:text-black cursor-pointer font-medium overflow-hidden',
  variants: {
    size: {
      full: 'w-full',
      dropdown: 'w-[110px] md:w-full',
    },
    text: {
      base: 'text-sm lg:text-base',
      dropdown: 'text-sm opacity-90 text-start',
    }
  },
});

const button = tv({
  base: 'flex items-center justify-center md:justify-end px-2 py-1 no-underline transition duration-200 ease-in-out',
  variants: {
    type: {
      dropdown: 'hover:bg-primaria-900 focus:bg-primaria-900 rounded-sm',
      base: 'hover:border-b-2 hover:border-segundaria-900',
    },
  },
});

const BtnRoute = ({ route, size, btn, txt, children }) => {
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
      className={button({ type: btn })} 
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