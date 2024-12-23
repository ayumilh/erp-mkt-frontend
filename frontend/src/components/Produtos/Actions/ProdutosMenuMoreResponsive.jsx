'use client'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import ModalTableExpanded from '@/components/Produtos/Actions/ModalTableExpanded';
import { DropdownSelectOrAll } from '@/components/Geral/Dropdown/DropdownSelectOrAll';
import BtnActions from '@/components/Geral/Button/BtnActions';
import { BtnBorder } from '@/components/Geral/Button/BtnBorder';
import ErrorEmpty from "@/components/Geral/Notifications/ErrorEmpty";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { searchUserId } from '@/utils/searchUserId';
import BtnGerarProdutos from './BtnGerarProdutos';

export const ProdutosMenuMoreResponsive = ({
    showCheckboxes,
    showCheckboxesAll,
    setShowCheckboxes,
    setShowCheckboxesAll,
    setIsModalGerar,
    idProduct,
    currentPage,
    totalPages,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [productIdEmpty, setProductIdEmpty] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const handleOpenMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    }

    const gerarProdutos = async () => {
        if (!idProduct || idProduct.length === 0) {
            setProductIdEmpty(true);
            return
        } else {
            setProductIdEmpty(false);
        }

        const userId = searchUserId();
        if (!userId) return

        try {
            await axios.get(`${process.env.BACKEND_URL}/api/stock/mercadolivre/get`, {
                params: {
                    idProduct: idProduct,
                    userId: userId
                }
            });
            setIsModalGerar(true);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    const menuMoreVertRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuMoreVertRef.current && !menuMoreVertRef.current.contains(event.target)) {
                setIsOpenMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuMoreVertRef]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative border-l-indigo-200 dark:bg-dark-primaria-900 w-full flex items-center justify-start pl-6 md:pl-4 py-4 gap-3 top-0 left-0 z-40" ref={menuMoreVertRef}>
            <div className="left-12">
                <BtnGerarProdutos onClick={gerarProdutos} />
            </div>

            {isMobile ? (<>
                <button onClick={handleOpenMenu}>
                    <MoreVertIcon
                        className='dark:text-gray-200'
                        sx={{
                            width: '18px',
                            color: '#2D3748',
                            transform: isOpenMenu ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease-in-out'
                        }} />
                </button>
                {isOpenMenu && (
                    <div className="top-10 left-10 absolute z-10 mt-2 px-2 rounded-md bg-white dark:bg-dark-primaria-900">
                        <DropdownSelectOrAll
                            title={'Gerar produtos do armazém'}
                            setShowCheckboxes={setShowCheckboxes}
                            showCheckboxes={showCheckboxes}
                            setShowCheckboxesAll={setShowCheckboxesAll}
                            showCheckboxesAll={showCheckboxesAll}
                        />
                        <BtnBorder title="Filtrar" />
                        <BtnBorder title="Editar em massa" />
                    </div>
                )}
            </>) : (<>
                {/* <DropdownSelectOrAll
                    title={'Gerar produtos do armazém'}
                    setShowCheckboxes={setShowCheckboxes}
                    showCheckboxes={showCheckboxes}
                    setShowCheckboxesAll={setShowCheckboxesAll}
                    showCheckboxesAll={showCheckboxesAll}
                /> */}
                <BtnBorder title="Filtrar" />
                <BtnBorder title="Editar em massa" />
                <button onClick={handleOpenModal} className='md:hidden cursor-pointer transform active:-translate-y-1 active:scale-105 transition duration-700 ease-in-out'>
                    <AspectRatioIcon className='text-neutral-700 dark:text-gray-300 hover:text-black' />
                </button>
            </>)}


            <div className="flex items-center gap-2 ml-auto">
                <button onClick={handleOpenModal} className='md:hidden cursor-pointer transform active:-translate-y-1 active:scale-105 transition duration-700 ease-in-out'>
                    <AspectRatioIcon className='text-neutral-700 dark:text-gray-300 hover:text-black' />
                </button>
                <ModalTableExpanded isOpen={isModalOpen} handleClose={handleCloseModal} />
                <div>
                    <select id="rowsPerPage" value={rowsPerPage} onChange={handleRowsPerPageChange} className="py-1 rounded bg-transparent dark:text-gray-200 dark:bg-dark-primaria-900">
                        <option value={5}>5 páginas</option>
                        <option value={10}>10 páginas</option>
                        <option value={20}>20 páginas</option>
                        <option value={50}>50 páginas</option>
                        <option value={100}>100 páginas</option>
                    </select>
                </div>

                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-1 py-1 rounded dark:text-gray-200">
                    <KeyboardArrowLeftIcon className={currentPage === 1 ? "opacity-50 dark:text-gray-200" : ""} />
                </button>
                <span className='dark:text-gray-200'>{currentPage} de {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-1 py-1 rounded dark:text-gray-200">
                    <KeyboardArrowRightIcon className={currentPage === totalPages ? "opacity-50 dark:text-gray-200" : ""} />
                </button>
            </div>
            {productIdEmpty && <ErrorEmpty title='produtos' onClose={() => setProductIdEmpty(false)} />}
        </div>
    )
}