'use client'
import { useEffect, useRef, useState } from 'react';
import { fetchOrderCounts } from '@/utils/fetchOrderCounts';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const DropdownHeader = ({ setActiveTable }) => {
    const [isOpenLista, setIsOpenLista] = useState(false);
    const [currentText, setCurrentText] = useState('Pedidos');
    const [currentCount, setCurrentCount] = useState(0)
    const [orderCounts, setOrderCounts] = useState({});
    const dropdownPedidosRef = useRef(null);

    const handleClickLista = () => {
        setIsOpenLista(!isOpenLista);
    };

    const handleClickEmitir = (text, count) => {
        setActiveTable(text);
        setCurrentCount(count);
        setCurrentText(text);
        setIsOpenLista(false);
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
    }, [dropdownPedidosRef]);

    useEffect(() => {
        const getOrderCounts = async () => {
            const counts = await fetchOrderCounts();
            if (counts) {
                setOrderCounts(counts);
                setCurrentCount(counts.totalOrders);
            }
        };
        getOrderCounts();
    }, []);

    return (
        <div className="relative inline-block text-left z-50" ref={dropdownPedidosRef}>
            <div>
                <button
                    type="button"
                    className="flex items-center justify-center px-2 md:px-3 py-2 border-b-2 border-segundaria-900 hover:border-b-2 hover:border-gray-300 transform focus:-translate-y-0.5 focus:scale-60 transition duration-300 ease-in-out"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                    onClick={handleClickLista}
                >
                    <span className="hover:text-black dark:text-gray-300 font-medium text-sm md:text-base">
                        {currentText} 
                        <span className="ml-2 font-medium dark:text-gray-300 opacity-70">{currentCount}</span>
                    </span> 
                    
                    <KeyboardArrowDownIcon sx={{
                        width: '20px',
                        transform: isOpenLista ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.4s ease-in-out'
                    }} className="-mr-1 ml-2 text-segundaria-900" aria-hidden="true" />
                </button>
            </div>

            {isOpenLista && (
                <div className="origin-top-center absolute mt-2 rounded-md shadow-lg bg-primaria-900 dark:bg-dark-primaria-900 ring-1 ring-black ring-opacity-5">
                    <div className="w-36 my-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button
                            className="flex justify-between w-full text-sm font-medium px-4 py-2 hover:text-black hover:bg-gray-200 dark:hover:bg-neutral-800 rounded-sm"
                            role="menuitem"
                            onClick={() => handleClickEmitir('Pedidos', orderCounts.totalOrders)}
                        >
                            <span className='dark:text-gray-200'>Pedidos</span>
                            <span className='text-end font-medium text-neutral-600 dark:text-gray-300 opacity-90'>{orderCounts.totalOrders || 0}</span>
                        </button>
                        <button
                            className="flex justify-between w-full text-sm font-medium px-4 py-2 hover:text-black hover:bg-gray-200 dark:hover:bg-neutral-800 rounded-sm"
                            role="menuitem"
                            onClick={() => handleClickEmitir('Emitir', orderCounts.approvedOrders)}
                        >
                            <span className='dark:text-gray-200'>Emitir</span>
                            <span className='font-medium text-neutral-600 dark:text-gray-300 opacity-90'>{orderCounts.approvedOrders || 0}</span>
                        </button>
                        <button onClick={() => handleClickEmitir('Enviar')} className="flex justify-between w-full text-sm font-medium px-4 py-2 hover:text-black hover:bg-gray-200 dark:hover:bg-neutral-800 rounded-sm" role="menuitem">
                            <span className='dark:text-gray-200'>Enviar</span>
                            <span className='font-medium text-neutral-600 dark:text-gray-300 opacity-90'>0</span>
                        </button>
                        <button
                            onClick={() => handleClickEmitir('Imprimir', orderCounts.readyOrders)}
                            className="flex justify-between w-full text-sm font-medium px-4 py-2 hover:text-black hover:bg-gray-200 dark:hover:bg-neutral-800 rounded-sm" role="menuitem">
                            <span className='dark:text-gray-200'>Imprimir</span>
                            <span className='font-medium text-neutral-600 dark:text-gray-300 opacity-90'>{orderCounts.readyOrders || 0}</span>
                        </button>
                        <button
                            onClick={() => handleClickEmitir('Retirada', orderCounts.readyPrintedOrders)}
                            className="flex justify-between w-full text-sm font-medium px-4 py-2 hover:text-black hover:bg-gray-200 dark:hover:bg-neutral-800 rounded-sm" role="menuitem">
                            <span className='dark:text-gray-200'>Retirada</span>
                            <span className='font-medium text-neutral-600 dark:text-gray-300 opacity-90'>{orderCounts.readyPrintedOrders || 0}</span>
                        </button>
                        <button
                            onClick={() => handleClickEmitir('Enviado', orderCounts.deliveredOrders)}
                            className="flex justify-between w-full text-sm font-medium px-4 py-2 hover:text-black hover:bg-gray-200 dark:hover:bg-neutral-800 rounded-sm" role="menuitem">
                            <span className='dark:text-gray-200'>Enviado</span>
                            <span className='font-medium text-neutral-600 dark:text-gray-300 opacity-90'>{orderCounts.deliveredOrders || 0}</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}