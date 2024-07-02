'use client'
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ChartLojasButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonValue, setButtonValue] = useState('Todas as Lojas');

  const handleClick = () => {
    setIsOpen(!isOpen);
  }

  const handleClose = (value) => {
    setIsOpen(false);
    setButtonValue(value);
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button 
          type="button" 
          className="bg-primaria-900 inline-flex justify-center w-[156px] rounded-md border border-gray-200 hover:border-[#c7c7c7] focus:outline-none focus:ring-1 focus:ring-[#d4d4d4] px-2 py-1" 
          id="options-menu" 
          aria-haspopup="true" 
          aria-expanded="true" 
          onClick={handleClick}
        >
          <span className='opacity-90 hover:opacity-100 text-sm font-medium'>{buttonValue}</span>
          <KeyboardArrowDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-center absolute z-10 mt-2 max-w-max rounded-md bg-white">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button 
              className="flex w-full opacity-90 text-sm font-medium px-2 py-1 hover:text-black hover:bg-gray-100" 
              role="menuitem"
              onClick={() => handleClose('Mercado Livre')}
            >
              Mercado Livre
            </button>
            <button 
              className="flex w-full opacity-90 text-sm font-medium px-2 py-1 hover:text-black hover:bg-gray-100"
              role="menuitem"
              onClick={() => handleClose('Shoope')}
            >
              Shoope
            </button>
            <button 
              className="flex w-full opacity-90 text-sm font-medium px-2 py-1 hover:text-black hover:bg-gray-100" 
              role="menuitem"
              onClick={() => handleClose('Amazon')}
            >
              Amazon
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChartLojasButton;