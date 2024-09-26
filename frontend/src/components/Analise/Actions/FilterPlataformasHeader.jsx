'use client'
import { useState, useEffect, useRef } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const FilterPlataformasHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [buttonValue, setButtonValue] = useState('Todas as Lojas');

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const handleClose = (value) => {
        setIsOpen(false);
        setButtonValue(value);
    }

    const dropdownPlataformasRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownPlataformasRef.current && !dropdownPlataformasRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [dropdownPlataformasRef])

    return (
        <div className="relative inline-block text-left" ref={dropdownPlataformasRef}>
            <div>
                <button
                    type="button"
                    className="inline-flex justify-center w-40 rounded-md border dark:bg-dark-primaria-900 border-gray-200 hover:border-[#c7c7c7] focus:outline-none focus:ring-1 focus:ring-[#d4d4d4] px-2 py-2"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                    onClick={handleClick}
                >
                    <span className='text-neutral-800 hover:text-black text-sm font-medium'>{buttonValue}</span>
                    <KeyboardArrowDownIcon sx={{
                        width: '18px',
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.4s ease-in-out'
                    }} className="-mr-1 ml-2 text-segundaria-900" aria-hidden="true" />
                </button>
            </div>

            {isOpen && (
                <div className="origin-top-center absolute z-10 mt-2 max-w-max rounded-md bg-white dark:bg-dark-primaria-900">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button
                            className="flex w-full text-neutral-800 text-sm font-medium px-3 py-2 hover:text-black hover:bg-gray-100"
                            role="menuitem"
                            onClick={() => handleClose('Mercado Livre')}
                        >
                            Mercado Livre
                        </button>
                        <button
                            className="flex w-full text-neutral-800 text-sm font-medium px-3 py-2 hover:text-black hover:bg-gray-100"
                            role="menuitem"
                            onClick={() => handleClose('Shoope')}
                        >
                            Shoope
                        </button>
                        <button
                            className="flex w-full text-neutral-800 text-sm font-medium px-3 py-2 hover:text-black hover:bg-gray-100"
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

export default FilterPlataformasHeader;