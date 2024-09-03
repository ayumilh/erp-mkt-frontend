'use client'
import { useEffect, useRef, useState } from 'react';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const DropdownRelatoriosHeader = ({ setActiveTable }) => {
    const [isOpenLista, setIsOpenLista] = useState(false);
    const [currentText, setCurrentText] = useState('Geral');
    const dropdownPedidosRef = useRef(null);


    const handleClickLista = () => {
        setIsOpenLista(!isOpenLista);
    };

    const handleClickEmitir = (text) => {
        setActiveTable(text);
        setCurrentText(text);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownPedidosRef.current && !dropdownPedidosRef.current.contains(event.target)) {
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
                    <KeyboardArrowDownIcon sx={{
                        width: '18px',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.4s ease-in-out'
                    }} className="-mr-1 ml-2 text-segundaria-900" aria-hidden="true" />
                </button>
                <hr className="border-segundaria-900 border-[1.5px]" />
            </div>

            {isOpenLista && (
                <div className="origin-top-center absolute z-10 mt-2 px-2 rounded-md bg-primaria-900">
                    <div className="w-full py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button
                            className="flex w-full opacity-90 text-sm font-medium px-2 my-2 hover:text-black hover:bg-white"
                            role="menuitem"
                            onClick={() => handleClickEmitir('Geral')}
                        >
                            Geral
                        </button>
                        <button
                            onClick={() => handleClickEmitir('Vendas')}
                            className="flex w-full opacity-90 text-sm font-medium px-2 my-2 hover:text-black hover:bg-white" role="menuitem">
                            Vendas
                        </button>
                        <button
                            onClick={() => handleClickEmitir('Lucros')}
                            className="flex w-full opacity-90 text-sm font-medium px-2 my-2 hover:text-black hover:bg-white" role="menuitem">
                            Lucros
                        </button>
                        <button
                            onClick={() => handleClickEmitir('Estoque')}
                            className="flex w-full opacity-90 text-sm font-medium px-2 my-2 hover:text-black hover:bg-white" role="menuitem">
                            Estoque
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
