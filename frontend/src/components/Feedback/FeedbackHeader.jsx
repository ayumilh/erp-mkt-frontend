'use client'
import { useEffect, useRef, useState } from "react";
import { DropdownList } from "./Actions/DropdownList";
import { BtnSincronizarPerguntas } from "./Actions/BtnSincronizarPerguntas";
import BtnRoute from "../Geral/Button/BtnRoute";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const FeedbackHeader = () => {
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
        <div className="w-full lg:w-[876px] xl:w-[1270px] flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between mb-6">
            <div className="flex gap-4">
                <DropdownList />
                <BtnRoute route="/feedback" size='full' btn='base' txt='base'>
                    Mensagem
                </BtnRoute>
                <div className="relative top-1 inline-block text-left lg:hidden" ref={dropdownMoreRef}>
                    <button
                        className="flex items-center transition duration-300 ease-in-out rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
                        onClick={toggleDropdown}
                    >
                        <ArrowDropDownIcon
                            sx={{
                                width: '34px',
                                color: '#2D3748',
                                transform: isVertical ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease-in-out'
                            }}
                        />
                    </button>

                    {isOpenMore && (
                        <div className={`w-auto absolute top-8 right-0 z-20 rounded-md shadow-lg bg-primaria-900 ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out transform ${isOpenMore ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                            <div className='w-60 my-2' role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <div className="flex flex-col">
                                    <BtnRoute route="/estoque" size='full' btn='dropdown' txt='dropdown'>
                                        Relatorio de estoque
                                    </BtnRoute>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="hidden lg:flex">
                    <BtnRoute route="/estoque" size='full' btn='base' txt='base'>
                        Relatorio de estoque
                    </BtnRoute>
                </div>
            </div>

            <div className="flex justify-end md:justify-end px-4 md:px-0 md:gap-6">
                <div>
                    <BtnSincronizarPerguntas />
                </div>
            </div>
        </div>
    )
}

export default FeedbackHeader