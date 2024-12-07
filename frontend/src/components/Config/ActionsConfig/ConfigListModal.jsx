import { useState, useRef, useEffect } from 'react';
import SettingsIcon from "@mui/icons-material/Settings";


const ConfigListModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsRotated(!isRotated);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className='flex h-12 lg:h-auto items-center group px-4 lg:px-2 py-1'>
        <span className='flex justify-center'>
        <SettingsIcon 
          sx={{
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.4s ease-in-out'
          }}
          className='text-neutral-700 dark:text-gray-300 group-hover:text-segundaria-900 transition duration-700 ease-in-out'/>
        </span>
      </button>
      {isOpen && (
        <div className={`absolute right-0 mt-2 max-w-max z-50 rounded-md shadow-lg bg-primaria-900 dark:bg-dark-primaria-900 ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <button className="w-full flex px-4 py-2 text-sm text-neutral-700 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 dark:active:bg-neutral-700 rounded-sm transition duration-300 ease-in-out">Integrações de loja</button>

          <button className="w-full flex px-4 py-2 text-sm text-neutral-700 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 dark:active:bg-neutral-700 rounded-sm transition duration-300 ease-in-out whitespace-nowrap">Integrações de serviços</button>

          <hr className="border-t border-gray-200 dark:border-neutral-600 py-1" />
          <h3 className="px-4 pt-2 pb-1 text-xs font-medium text-neutral-600 dark:text-gray-300">Configurações</h3>
          
          <button className="w-full flex px-4 py-2 text-sm text-neutral-700 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 dark:active:bg-neutral-700 rounded-sm transition duration-300 ease-in-out whitespace-nowrap">Pedido</button>

          <button className="w-full flex px-4 py-2 text-sm text-neutral-700 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 dark:active:bg-neutral-700 rounded-sm transition duration-300 ease-in-out">Envio</button>
          <button className="w-full flex px-4 py-2 text-sm text-neutral-700 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 dark:active:bg-neutral-700 rounded-sm transition duration-300 ease-in-out">Impressão</button>

          <button className="w-full flex px-4 py-2 text-sm text-neutral-700 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 dark:active:bg-neutral-700 rounded-sm transition duration-300 ease-in-out">Nota fiscal</button>

          <button className="w-full flex px-4 py-2 text-sm text-neutral-700 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 dark:active:bg-neutral-700 rounded-sm transition duration-300 ease-in-out">Estoque</button>

          <button className="w-full flex px-4 py-2 text-sm text-neutral-700 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 dark:active:bg-neutral-700 rounded-sm transition duration-300 ease-in-out">Permissão</button>

        </div>
      )}
    </div>
  );
};

export default ConfigListModal;