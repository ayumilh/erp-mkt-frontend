import { useState, useRef, useEffect } from 'react';
import PrintIcon from '@mui/icons-material/LocalPrintshopOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const DropdownSelectOrAll = ({setShowCheckboxes, showCheckboxes, setShowCheckboxesAll, showCheckboxesAll, title}) => {
  const [isOpenEmitir, setIsOpenEmitir] = useState(false)

  const handleBtnEmitir = () => {
    setIsOpenEmitir(!isOpenEmitir);
  }

  // selecionando
  const handleEmitirSelecionados = async () => {
    setShowCheckboxes(!showCheckboxes);
    setShowCheckboxesAll(false);
  }

  const handleEmitirTodos = async () => {
    setShowCheckboxesAll(!showCheckboxesAll);
    setShowCheckboxes(false);
  }


  const menuEmitirRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuEmitirRef.current && !menuEmitirRef.current.contains(event.target)) {
        setIsOpenEmitir(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuEmitirRef]);


  return (
    <div className='relative inline-block text-left' ref={menuEmitirRef}>
      <button
        aria-controls="btn-pie"
        aria-haspopup="true"
        className="w-full h-8 px-2 my-1 md:rounded-lg md:border md:border-gray-200 md:hover:border-[#c7c7c7] focus:outline-none focus:ring-1 md:focus:ring-[#d4d4d4] flex items-center justify-start md:justify-center"
        onClick={handleBtnEmitir}
      >
        {title === 'Emitir' && <ReceiptLongOutlinedIcon className="mr-2 h-4 w-4"/>}
        {title === 'Imprimir' && <PrintIcon className="mr-2 h-4 w-4"/>}
        <span className="opacity-90 hover:opacity-100 text-sm font-medium">{title}</span>
        <KeyboardArrowDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
      </button>

      {isOpenEmitir && (
        <div className="max-w-max top-8 absolute z-10 mt-2 px-2 rounded-md bg-white">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button onClick={handleEmitirSelecionados} className="flex w-full opacity-90 hover:text-black text-sm font-medium px-2 my-2 hover:bg-gray-100" role="menuitem">
              Selecionar
            </button>
            <button onClick={handleEmitirTodos} className="flex w-full opacity-90 hover:text-black text-sm font-medium px-2 my-2 hover:bg-gray-100" role="menuitem">
              Todos
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
