'use client'
import { useState, useEffect, useRef } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ChartFilterLojas = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [buttonValue, setButtonValue] = useState('Todas as Lojas');

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const handleClose = (value) => {
        setIsOpen(false);
        setButtonValue(value);
    }

    const filterLojasRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterLojasRef.current && !filterLojasRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [filterLojasRef])

    return (
        <div className="relative inline-block text-left" ref={filterLojasRef}>
            <div>
                <button
                    type="button"
                    className="bg-primaria-900 inline-flex items-center justify-center w-[156px] rounded-md border border-gray-200 active:ring-gray-300 focus:outline-none focus:ring-1 focus:ring-[#d4d4d4] px-2 py-1 transition duration-300 ease-in-out"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                    onClick={handleClick}
                >
                    <span className='text-neutral-600 hover:text-neutral-800 text-sm font-medium transition duration-300 ease-in-out'>{buttonValue}</span>
                    <KeyboardArrowDownIcon sx={{
                        width: '20px',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.4s ease-in-out'
                    }} className="-mr-1 ml-2 text-segundaria-900" aria-hidden="true" />
                </button>
            </div>

            {isOpen && (
                <div className={`origin-top-center absolute z-20 mt-2 w-full rounded-md shadow-lg bg-primaria-900 ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <div className="my-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button
                            className="w-full flex px-4 py-2 text-sm text-neutral-700 font-medium hover:bg-gray-200 active:bg-gray-100 rounded-sm transition duration-300 ease-in-out"
                            role="menuitem"
                            onClick={() => handleClose('Mercado Livre')}
                        >
                            Mercado Livre
                        </button>
                        <button
                            className="w-full flex px-4 py-2 text-sm text-neutral-700 font-medium hover:bg-gray-200 active:bg-gray-100 rounded-sm transition duration-300 ease-in-out"
                            role="menuitem"
                            onClick={() => handleClose('Shoope')}
                        >
                            Shoope
                        </button>
                        <button
                            className="w-full flex px-4 py-2 text-sm text-neutral-700 font-medium hover:bg-gray-200 active:bg-gray-100 rounded-sm transition duration-300 ease-in-out"
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

export default ChartFilterLojas;