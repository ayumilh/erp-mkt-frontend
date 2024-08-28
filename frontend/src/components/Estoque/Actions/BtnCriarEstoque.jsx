'use client'
import { useEffect, useRef, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BtnRoute from '@/components/Geral/Button/BtnRoute';

export const BtnCriarEstoque = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const dropdownCriarRef = useRef(null);
  useEffect(() =>{
    const handleClickOutside = (event) => {
      if(dropdownCriarRef.current && !dropdownCriarRef.current.contains(event.target)){
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownCriarRef])

  return (
    <div className="relative inline-block text-left" ref={dropdownCriarRef}>
      <div>
        <button 
          type="button" 
          className="w-full flex items-center justify-center bg-gradient-to-r from-gradient-start to-gradient-end hover:bg-gradient-to-b hover:from-gradient-start-hover hover:to-gradient-end-hover transition-all duration-700 ease-out rounded-xl text-white hover:text-slate-50 px-3 xl:px-4 py-2" 
          id="options-menu" 
          aria-haspopup="true" 
          aria-expanded="true" 
          onClick={handleButtonClick}
        >
          <span className="text-white text-sm">Criar</span>
          <KeyboardArrowDownIcon className={`-mr-1 ml-1 h-5 w-5 text-white transition-transform duration-500 ${isOpen ? 'rotate-180' : ''} `} aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right right-2 absolute z-10 mt-2 px-2 rounded-md items-start shadow-lg bg-primaria-900 ring-1 ring-black ring-opacity-5">
          <div className="w-28 flex flex-col my-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <BtnRoute route="/estoque/criarUnico" size='dropdown' btn='dropdown' txt='dropdown'>
              Unico
            </BtnRoute>

            <BtnRoute route="/estoque/criarVariante" size='dropdown' btn='dropdown' txt='dropdown'>
              Variado
            </BtnRoute>

            <BtnRoute route="/estoque/criarKit" size='dropdown' btn='dropdown' txt='dropdown'>
              Kit
            </BtnRoute>
          </div>
        </div>
      )}
  </div>
  )
}
