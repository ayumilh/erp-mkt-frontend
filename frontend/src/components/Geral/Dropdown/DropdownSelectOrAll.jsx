import { useState, useRef, useEffect } from 'react';
import PrintIcon from '@mui/icons-material/LocalPrintshopOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const DropdownSelectOrAll = ({ setShowCheckboxes, showCheckboxes, setShowCheckboxesAll, showCheckboxesAll, title }) => {
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
                className="w-full h-8 px-2 my-1 md:rounded-lg md:border md:border-gray-200 dark:md:border-neutral-700 md:hover:border-[#c7c7c7] focus:outline-none focus:ring-1 md:focus:ring-[#d4d4d4] flex items-center justify-start md:justify-center"
                onClick={handleBtnEmitir}
            >
                {title === 'Emitir' && <ReceiptLongOutlinedIcon fontSize='small' className="mr-2 dark:text-gray-300" />}
                {title === 'Imprimir' && <PrintIcon fontSize='small' className="mr-2 dark:text-gray-300" />}
                <span className="text-neutral-700 hover:text-black dark:text-gray-200 text-sm font-medium">{title}</span>
                <KeyboardArrowDownIcon sx={{
                    width: '20px',
                    transform: isOpenEmitir ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.4s ease-in-out'
                }} className="-mr-1 ml-2 text-segundaria-900" aria-hidden="true" />
            </button>

            {isOpenEmitir && (
                <div className={`max-w-max top-12 absolute z-20 rounded-md shadow-lg bg-primaria-900 dark:bg-dark-primaria-900 ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out transform ${isOpenEmitir ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <div className="my-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button onClick={handleEmitirSelecionados} className="w-full flex px-4 py-2 text-sm text-neutral-700 dark:text-gray-200 font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 dark:active:bg-neutral-800 rounded-sm transition duration-300 ease-in-out" role="menuitem">
                            Selecionar
                        </button>
                        <button onClick={handleEmitirTodos} className="w-full flex px-4 py-2 text-sm text-neutral-700 dark:text-gray-200 font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 dark:active:bg-neutral-800 rounded-sm transition duration-300 ease-in-out" role="menuitem">
                            Todos
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
