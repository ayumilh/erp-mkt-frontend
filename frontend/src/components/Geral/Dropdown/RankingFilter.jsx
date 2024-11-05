'use client'
import { useState, useRef, useEffect } from 'react';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const RankingFilter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Top Vendas');
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="relative inline-block text-left mt-3" ref={dropdownRef}>
            <button
                aria-controls="btn-pie"
                aria-haspopup="true"
                className="bg-primaria-900 dark:bg-dark-primaria-900 inline-flex justify-center w-full rounded-md border border-gray-200 dark:border-neutral-800 hover:border-[#c7c7c7] focus:outline-none focus:ring-1 focus:ring-[#d4d4d4] px-2 py-1 transition duration-300 ease-in-out"
                onClick={toggleDropdown}
            >
                <span className="text-neutral-700 dark:text-gray-200 dark:hover:text-white text-sm font-medium transition duration-300 ease-in-out">{selectedOption}</span>
                <KeyboardArrowDownIcon
                    className={`-mr-1 ml-2 md:ml-0 text-segundaria-900 cursor-pointer transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
                    fontSize='small'
                    sx={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.4s ease-in-out'
                    }}
                />
            </button>

            {isOpen && (
                <div className={`max-w-fit absolute bottom-10 left-0 z-20 mt-2 rounded-md shadow-lg bg-primaria-900 dark:bg-dark-primaria-900 ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <div className='my-2' role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button
                            className="w-full flex px-4 py-2 text-sm text-neutral-700 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 dark:active:bg-neutral-700 rounded-sm transition duration-300 ease-in-out"
                            role="menuitem"
                            onClick={() => handleOptionClick('Top Vendas')}
                        >
                            Top Vendas
                        </button>
                        <button
                            className="w-full flex px-4 py-2 text-sm text-neutral-700 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 dark:active:bg-neutral-700 rounded-sm transition duration-300 ease-in-out"
                            role="menuitem"
                            onClick={() => handleOptionClick('Mais Avaliados')}
                        >
                            Mais Avaliados
                        </button>
                        <button
                            className="w-full flex px-4 py-2 text-sm text-neutral-700 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 dark:active:bg-neutral-700 rounded-sm transition duration-300 ease-in-out"
                            role="menuitem"
                            onClick={() => handleOptionClick('Mais Recentes')}
                        >
                            Mais Recentes
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default RankingFilter;