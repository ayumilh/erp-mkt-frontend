'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { tv } from 'tailwind-variants'
import CircularProgress from '@mui/material/CircularProgress';

const button = tv({
  base:'w-full bg-gradient-to-r from-gradient-start to-gradient-end hover:bg-gradient-to-b hover:from-gradient-start-hover hover:to-gradient-end-hover transition-all duration-700 ease-out rounded-xl text-white hover:text-slate-50 px-3 py-2',
  variants: {
    padding: {
      xs: 'px-2 py-1',
      sm: 'p-2',
      md: 'px-3',
      lg: 'px-4',
    },
    width: {
      full: 'w-full',
    },
    size: {
      btnHeader: 'flex items-center justify-center xl:px-4',
      btnSimple: 'w-full',
    },
  }
})

const span = tv({
  base: 'w-[72px] md:w-full text-white text-sm overflow-hidden',
  variants: {
    width: {
      full: 'w-full',
    },
      margin: {
        xs: 'm-1',
        sm: 'm-2',
        md: 'm-3',
        lg: 'm-4',
    },
  }
})

export default function BtnActive({ title, page, size, onClick, padding, margin, width }){
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const handleClick = async () => {
    setIsLoading(true);
    if(page) {
      await router.push(page);
    } else if(onClick) {
      await onClick();
    }
    setIsLoading(false);
  }

  
  return (
    <button
      type="button"
      onClick={handleClick}
      className={button({size: size, padding: padding, width: width})}
    >
      {isLoading ? (
        <><CircularProgress color="inherit" className="text-white mr-1" size={12} /> <span className={`${span({width: width, margin: margin})}`} style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}...</span></>
      ) : (
        <span className={`${span({width: width, margin: margin})}`} style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
      )}
    </button>
  )
}
