'use client'
import { useState, useRef, useEffect } from 'react';
import BtnRoute from "../Geral/Button/BtnRoute";
import { DropdownList } from "./Actions/DropdownList";
import { BtnCriarEstoque } from "./Actions/BtnCriarEstoque";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const EstoqueHeader = () => {
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
        <div className="w-full flex flex-col xl:flex-row justify-between mb-6">
            <div className="flex gap-3">
                <DropdownList />
                <BtnRoute route="/estoque" size='full' btn='base' txt='base'>
                    Meu Armazém
                </BtnRoute>
                <div className="relative top-3 inline-block text-left lg:hidden" ref={dropdownMoreRef}>
                    <button
                        className="flex items-center transition duration-300 ease-in-out rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
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
                        <div className={`w-auto absolute top-8 right-0 z-20 rounded-md shadow-lg bg-primaria-900 dark:bg-neutral-800 ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out transform ${isOpenMore ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                            <div className='w-60 my-2' role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <div className="flex flex-col">
                                    <BtnRoute route="/estoque/sincronizarAnuncios" size='full' btn='dropdown' txt='dropdown'>
                                        Sincronizar anúncios
                                    </BtnRoute>

                                    <BtnRoute route="/estoque" size='full' btn='dropdown' txt='dropdown'>
                                        Relatorio de estoque
                                    </BtnRoute>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-3 justify-end mt-4 xl:mt-0">
                <div className="lg:flex hidden flex-row gap-0 md:gap-0">
                    <BtnRoute route="/estoque/sincronizarAnuncios" size='full' btn='base' txt='base'>
                        Sincronizar anúncios
                    </BtnRoute>

                    <BtnRoute route="/estoque" size='full' btn='base' txt='base'>
                        Relatorio de estoque
                    </BtnRoute>
                </div>
                <div>
                    <BtnCriarEstoque />
                </div>
            </div>
        </div>
    )
}

export default EstoqueHeader