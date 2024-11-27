import { useState, useRef, useEffect } from 'react';
import PrintIcon from '@mui/icons-material/LocalPrintshopOutlined';
import { FaCog, FaInfoCircle } from 'react-icons/fa';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

function BtnDropdown({ onClickImprimir, setIsModalConfigOpen }) {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false);

    const openModalConfig = () => {
      setIsModalConfigOpen(true);
    };
  
    const closeModalConfig = () => {
      setIsModalConfigOpen(false);
    };

    const handleBtn = () => {
        setIsOpen(!isOpen);
    }

    const handleImprimir = async () => {
        setLoading(true);
        try {
            await onClickImprimir();
        } finally {
            setLoading(false);
        }
    };

    const menuRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [menuRef]);


    const BootstrapTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
      ))(() => ({
        [`& .${tooltipClasses.arrow}`]: {
          color: ['#e5e7eb', '!important'],
        },
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: ['#262626', '!important'],
          fontSize: '13px',
        },
      }));

    return (
        <div className='relative inline-block text-left w-full' ref={menuRef}>
            <button
                aria-controls="btn-pie"
                aria-haspopup="true"
                className="w-full h-8 px-2 my-1 md:rounded-lg md:border md:border-gray-200 dark:md:border-neutral-700 md:hover:border-[#c7c7c7] focus:outline-none focus:ring-1 md:focus:ring-[#d4d4d4] flex items-center justify-start md:justify-center"
                onClick={handleBtn}
            >
                            {loading ? (
                <CircularProgress color="inherit" size={12} className="mr-2" />
            ) : (
                <PrintIcon fontSize='small' className="mr-2 text-neutral-700 dark:text-gray-300" />
            )}
                
                <span className="text-neutral-700 hover:text-black dark:text-gray-200 text-sm font-medium">Imprimir Etiqueta</span>
                <KeyboardArrowDownIcon sx={{
                    width: '20px',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.4s ease-in-out'
                }} className="-mr-1 ml-2 text-segundaria-900" aria-hidden="true" />
            </button>

            {isOpen && (
                <div className={`top-12 absolute z-20 rounded-md shadow-lg bg-primaria-900 dark:bg-dark-primaria-900 ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <div className="my-2 w-full" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <div
                            className='flex items-center px-4 py-2 w-full hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 dark:active:bg-neutral-800 transition duration-300 ease-in-out'
                        >
                            <button
                                onClick={handleImprimir}
                                className="w-full text-left text-sm text-neutral-700 dark:text-gray-200 font-medium rounded-sm"
                                role="menuitem"
                            >
                                Imprimir Etiqueta
                            </button>
                            <BootstrapTooltip
                                arrow
                                title="Configurações"
                                placement="right"
                                PopperProps={{
                                    modifiers: [
                                        {
                                            name: 'offset',
                                            options: {
                                                offset: [0, 8],
                                            },
                                        },
                                    ],
                                }}
                            >
                                <button
                                    onClick={openModalConfig}
                                    className="ml-2"
                                    aria-label="Configurações de Etiqueta"
                                >
                                    <FaCog className="text-base text-neutral-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition duration-300 ease-in-out" />
                                </button>
                            </BootstrapTooltip>
                        </div>

                        <div
                            className='flex items-center px-4 py-2 w-full hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 dark:active:bg-neutral-800 transition duration-300 ease-in-out'
                        >
                            <button
                                className="w-full text-left text-sm text-neutral-700 dark:text-gray-200 font-medium rounded-sm whitespace-nowrap"
                                role="menuitem"
                            >
                                Imprimir Etiqueta-Alta velocidade
                            </button>
                            <BootstrapTooltip
                                arrow
                                title={
                                    <>
                                        1. Supera o limite de [Imprimir Etiqueta] imprimindo 300 etiquetas e permita a impressão de 1.000 etiquetas.
                                        <br />
                                        2. Melhora significativamente a velocidade de impressão de etiquetas.
                                    </>
                                }
                                placement='right'
                                PopperProps={{
                                    modifiers: [
                                        {
                                            name: 'offset',
                                            options: {
                                                offset: [0, 8],
                                            },
                                        },
                                    ],
                                }}
                                sx={{ [`& .${tooltipClasses.tooltip}`]: { width: '200px' } }}
                            >
                                <button
                                    className="ml-2"
                                    aria-label="Informações"
                                >
                                    <FaInfoCircle className="text-base text-neutral-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition duration-300 ease-in-out" />
                                </button>
                            </BootstrapTooltip>
                        </div>
                        <div
                            className='flex items-center px-4 py-2 w-full hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 dark:active:bg-neutral-800 transition duration-300 ease-in-out'
                        >
                            <button
                                onClick={onClickImprimir}
                                className="w-full text-left text-sm text-neutral-700 dark:text-gray-200 font-medium rounded-sm"
                                role="menuitem"
                            >
                                Imprimir Pick List
                            </button>
                            <BootstrapTooltip
                                arrow
                                title="Configurações de Pick List"
                                placement="right"
                                PopperProps={{
                                    modifiers: [
                                        {
                                            name: 'offset',
                                            options: {
                                                offset: [0, 8],
                                            },
                                        },
                                    ],
                                }}
                            >
                                <button
                                    className="ml-2"
                                    aria-label="Configurações de Pick List"
                                >
                                    <FaCog className="text-base text-neutral-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition duration-300 ease-in-out" />
                                </button>
                            </BootstrapTooltip>
                        </div>
                        <button
                            className="w-full px-4 py-2 text-left text-sm text-neutral-700 dark:text-gray-200 font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 dark:active:bg-neutral-800 rounded-sm transition duration-300 ease-in-out"
                            role="menuitem"
                        >
                            Imprimir Etiqueta e Pick List
                        </button>
                        <button
                            className="w-full px-4 py-2 text-left text-sm text-neutral-700 dark:text-gray-200 font-medium hover:bg-gray-200 dark:hover:bg-neutral-800 active:bg-gray-100 dark:active:bg-neutral-800 rounded-sm transition duration-300 ease-in-out whitespace-nowrap"
                            role="menuitem"
                        >
                            Imprimir Lista de Resumo
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BtnDropdown