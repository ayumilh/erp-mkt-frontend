'use client'
import { useState, useRef, useEffect } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const ChartMore = () => {
    const [isOpenMore, setIsOpenMore] = useState(false);
    const [isVertical, setIsVertical] = useState(false);

    const toggleDropdown = () => {
        setIsOpenMore(!isOpenMore);
        setIsVertical(!isVertical);
    };

    const dropdownMoreRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownMoreRef.current && !dropdownMoreRef.current.contains(event.target)) {
                setIsOpenMore(false);
                setIsVertical(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [dropdownMoreRef]);

    return (
        <div className="relative inline-block text-left" ref={dropdownMoreRef}>
            <button
                className="flex items-center space-x-2 transition duration-300 ease-in-out rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
                onClick={toggleDropdown}
            >
                <MoreHorizIcon
                    className='dark:text-gray-200'
                    sx={{
                        width: '34px',
                        transform: isVertical ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease-in-out'
                    }}
                />
            </button>

            {isOpenMore && (
                <div className={`w-[108px] absolute top-8 right-0 z-20 mt-2 rounded-md shadow-lg bg-primaria-900 ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out transform ${isOpenMore ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <div className='my-2 h-20' role="menu" aria-orientation="vertical" aria-labelledby="options-menu">

                    </div>
                </div>
            )}
        </div>
    );
};

export default ChartMore;