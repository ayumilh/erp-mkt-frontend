'use client'
import { useRef, useState, useEffect } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const DropdownList = () => {
  const [isOpenLista, setIsOpenLista] = useState(false);
  const dropdownListaRef = useRef(null);


  const handleClickLista = () => {
    setIsOpenLista(!isOpenLista);
  };

  useEffect(() =>{
    const handleClickOutside = (event) => {
      if(dropdownListaRef.current && !dropdownListaRef.current.contains(event.target)){
        setIsOpenLista(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownListaRef])

  return (
    <div className="relative inline-block text-left" ref={dropdownListaRef}>
    <div>
      <button 
        type="button" 
        className="flex items-center justify-center rounded-lg px-2 md:px-3" 
        id="options-menu" 
        aria-haspopup="true" 
        aria-expanded="true" 
        onClick={handleClickLista}
      >
        <span className="hover:text-black font-medium text-sm md:text-base">Avaliações</span>
        <KeyboardArrowDownIcon className={`-mr-1 ml-2 h-5 w-5 transition-transform duration-500 ${isOpenLista ? 'rotate-180' : ''} `} aria-hidden="true" />
      </button>
      <hr className="border-segundaria-900 border-[1.5px]" />
    </div>

    {isOpenLista && (
      <div className="w-max origin-top-center absolute z-10 top-8 mt-2 px-2 rounded-md shadow-lg bg-primaria-900 ring-1 ring-black ring-opacity-5">
        <div className="w-40 my-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <button className="flex w-full text-sm font-medium px-2 py-1 hover:text-black hover:bg-gray-200 rounded-sm transition duration-200 ease-in-out" role="menuitem">
            Lista de Avaliações
          </button>
          <button className="flex w-full text-sm font-medium px-2 py-1 hover:text-black hover:bg-gray-200 rounded-sm transition duration-200 ease-in-out" role="menuitem">
            Resposta autmática
          </button>
          <button className="flex w-full text-sm font-medium px-2 py-1 hover:text-black hover:bg-gray-200 rounded-sm transition duration-200 ease-in-out" role="menuitem">
            Modelo de Resposta
          </button>
        </div>
      </div>
    )}
  </div>
  )
}
