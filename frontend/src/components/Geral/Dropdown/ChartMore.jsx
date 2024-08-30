'use client'
import { useState, useRef, useEffect } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ChartMore = () => {
    const [isOpenMore, setIsOpenMore] = useState(false);

    const toggleDropdown = () => {
        setIsOpenMore(!isOpenMore);
    };

    const dropdownMoreRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownMoreRef.current && !dropdownMoreRef.current.contains(event.target)) {
                setIsOpenMore(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [dropdownMoreRef]);

    return (
        <div className="relative inline-block text-left">
            <button
                className="flex items-center space-x-2 transition duration-300 ease-in-out rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
                onClick={toggleDropdown}
            >
                <MoreVertIcon sx={{ width: '34px', color: '#2D3748'}}/>
            </button>

            {isOpenMore && (
                <div className={`w-[108px] absolute top-8 right-0 z-20 mt-2 rounded-md shadow-lg bg-primaria-900 ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out transform ${isOpenMore ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`} ref={dropdownMoreRef}>
                    <div className='my-2 h-20' role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChartMore;