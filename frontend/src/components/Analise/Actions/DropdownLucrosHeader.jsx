'use client'
import { useEffect, useRef, useState } from 'react';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const DropdownLucrosHeader = ({ setActiveTable }) => {
  const [isOpenLista, setIsOpenLista] = useState(false);
  const [currentText, setCurrentText] = useState('Relatórios de lucros');
  const dropdownPedidosRef = useRef(null);


  const handleClickLista = () => {
    setIsOpenLista(!isOpenLista);
  };

  const handleClickEmitir = (text) => {
    setActiveTable(text);
    setCurrentText(text);
  };


  useEffect(() =>{
    const handleClickOutside = (event) => {
      if(dropdownPedidosRef.current && !dropdownPedidosRef.current.contains(event.target)){
        setIsOpenLista(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownPedidosRef])

  return (
    <div className="relative inline-block text-left" ref={dropdownPedidosRef}>
      <div>
        <button 
          type="button" 
          className="flex items-center justify-center rounded-lg px-2 md:px-3" 
          id="options-menu" 
          aria-haspopup="true" 
          aria-expanded="true" 
          onClick={handleClickLista}
        >
          <span className="hover:text-black font-medium text-sm md:text-base">{currentText}</span>
          <KeyboardArrowDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </button>
        <hr className="border-segundaria-900 border-[1.5px]" />
      </div>

      {isOpenLista && (
        <div className="origin-top-center absolute z-10 mt-2 px-2 rounded-md bg-primaria-900">
          <div className="w-full py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button 
              className="flex w-full opacity-90 text-sm font-medium px-2 my-2 hover:text-black hover:bg-white" 
              role="menuitem"
              onClick={() => handleClickEmitir('Lucros por pedido')}
            >
              Lucros por pedido
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
