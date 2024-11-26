'use client'
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react'
import { tv } from 'tailwind-variants'

const button = tv({
  base: 'w-full rounded-2xl py-2',
  variants: {
    padding: {
      xs: 'px-2 py-1',
      sm: 'p-2',
      md: 'px-3',
      lg: 'px-4',
    },
    bg: {
      ativado: 'bg-segundaria-900',
      desativado: 'bg-[#F1F5F9]',
    },
    rounded: {
      lg: 'rounded-lg',
    }
  }
})

const span = tv({
  base: 'overflow-hidden text-sm md:text-base',
  variants: {
    text: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
    },
    color: {
      ativado: 'text-white',
      desativado: 'text-neutral-600',
    },
  }
})

export default function BtnActions({title, onClick, padding, text, rounded, color}){
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault()
    setIsLoading(true);
    try{
      if(onClick) {
        await onClick(event);
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={(event) => handleClick(event)}
      disabled={isLoading}
      className={`${button({padding: padding, rounded: rounded, bg: color, text:text})} ${isLoading ? 'cursor-not-allowed' : ''}`}
      >
       {isLoading ? (
          <span 
            className={span({text:text, color:color})}>
              <CircularProgress color="inherit" className="text-white mr-2" size={12} /> 
              {title}...
          </span>
        ) : (
          <span 
          className={`${span({color: color, text:text})} w-[72px] md:w-[120px]`} 
          style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {title}
          </span>
       )}
      </button>
  )
}
