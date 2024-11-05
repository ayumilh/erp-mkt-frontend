'use client'
import { useState, useRef, useEffect } from 'react';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const ChartFilterWeek = () => {
    const [isOpenWeek, setIsOpenWeek] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Hoje');

    const toggleDropdown = () => {
        setIsOpenWeek(!isOpenWeek);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpenWeek(false);
    };

    const dropdownWeekRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownWeekRef.current && !dropdownWeekRef.current.contains(event.target)) {
                setIsOpenWeek(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [dropdownWeekRef]);

    return (
        <div className="relative inline-block text-left" ref={dropdownWeekRef}>
            <button
                className="flex items-center space-x-2 transition duration-300 ease-in-out rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
                onClick={toggleDropdown}
            >
                <span className="text-neutral-700 dark:text-gray-200 dark:hover:text-white text-sm font-medium">{selectedOption}</span>
                <KeyboardArrowDownIcon
                    className={`-mr-1 ml-2 md:ml-0 text-segundaria-900 cursor-pointer transition-transform duration-500 ${isOpenWeek ? 'rotate-180' : ''}`}
                    fontSize='small'
                    sx={{
                        transform: isOpenWeek ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.4s ease-in-out'
                    }}
                />
            </button>

            {isOpenWeek && (
                <div className={`w-[108px] absolute top-8 left-0 z-20 mt-2 rounded-md shadow-lg bg-primaria-900 dark:bg-dark-primaria-900 ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out transform ${isOpenWeek ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <div className='my-2' role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button onClick={() => handleOptionClick('1 Semana')} className="w-full flex px-4 py-2 text-sm text-neutral-700 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 dark:active:bg-neutral-700 rounded-sm transition duration-300 ease-in-out" role="menuitem">1 Semana</button>
                        <button onClick={() => handleOptionClick('15 Dias')} className="w-full flex px-4 py-2 text-sm text-neutral-700 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 dark:active:bg-neutral-700 rounded-sm transition duration-300 ease-in-out" role="menuitem">15 Dias</button>
                        <button onClick={() => handleOptionClick('1 Mês')} className="w-full flex px-4 py-2 text-sm text-neutral-700 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 dark:active:bg-neutral-700 rounded-sm transition duration-300 ease-in-out" role="menuitem">1 Mês</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChartFilterWeek;