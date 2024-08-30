'use client'
import React, { useState } from 'react';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ChartFilterWeek = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="flex items-center space-x-2 transition duration-300 ease-in-out rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
        onClick={toggleDropdown}
      >
        <span className="text-neutral-700 text-sm font-medium">Semana</span>
        <KeyboardArrowDownIcon className={`-mr-1 ml-2 md:ml-0 h-5 w-5 text-segundaria-900 cursor-pointer transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute top-8 left-0 z-20 mt-2 w-auto rounded-md shadow-lg bg-primaria-900 ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className='my-2' role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button className="w-full flex px-4 py-2 text-sm text-neutral-600 hover:bg-gray-200 active:bg-gray-100 rounded-sm" role="menuitem">1 Semana</button>
            <button className="w-full flex px-4 py-2 text-sm text-neutral-600 hover:bg-gray-200 active:bg-gray-100 rounded-sm" role="menuitem">15 dias</button>
            <button className="w-full flex px-4 py-2 text-sm text-neutral-600 hover:bg-gray-200 active:bg-gray-100 rounded-sm" role="menuitem">1 mês</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartFilterWeek;