'use client'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DropdownSelectOrAll } from '@/components/Geral/Button/DropdownSelectOrAll';
import BtnActions from '@/components/Geral/Button/BtnActions';
import { BtnBorder } from '@/components/Geral/Button/BtnBorder';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

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
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const handleOpenMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    }

    const gerarProdutos = async () => {
        if (idProduct.length === 0) return
        try {
            await axios.get('https://erp-mkt.vercel.app/api/stock/mercadolivre/get', { params: { idProduct } });
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

    return (
        <div className="border-l-indigo-200 w-full flex items-center justify-start pl-6 md:pl-4 py-4 gap-3 sticky top-0 left-0 bg-primaria-900" ref={menuMoreVertRef}>
            {isMobile ? (<>
                <button onClick={handleOpenMenu}>
                    <MoreVertIcon
                        sx={{
                            width: '18px',
                            color: '#2D3748',
                            transform: isOpenMenu ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease-in-out'
                        }} />
                </button>
                {isOpenMenu && (
                    <div className="top-10 left-14 absolute z-10 mt-2 px-2 rounded-md bg-white">
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
                <DropdownSelectOrAll
                    title={'Gerar produtos do armazém'}
                    setShowCheckboxes={setShowCheckboxes}
                    showCheckboxes={showCheckboxes}
                    setShowCheckboxesAll={setShowCheckboxesAll}
                    showCheckboxesAll={showCheckboxesAll}
                />
                <BtnBorder title="Filtrar" />
                <BtnBorder title="Editar em massa" />
            </>)}

            {(showCheckboxes || showCheckboxesAll) &&
                <div className="left-12">
                    <BtnActions title="Gerar" onClick={gerarProdutos} color="ativado" padding="xs" text="sm" rounded="lg" />
                </div>
            }

            <div className="flex items-center gap-2 ml-auto">
                <div>
                    <select id="rowsPerPage" value={rowsPerPage} onChange={handleRowsPerPageChange} className="py-1 rounded bg-transparent">
                        <option value={5}>5 páginas</option>
                        <option value={10}>10 páginas</option>
                        <option value={20}>20 páginas</option>
                        <option value={50}>50 páginas</option>
                        <option value={100}>100 páginas</option>
                    </select>
                </div>

                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-1 py-1 rounded">
                    <KeyboardArrowLeftIcon className={currentPage === 1 ? "opacity-50" : ""} />
                </button>
                <span>{currentPage} de {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-1 py-1 rounded">
                    <KeyboardArrowRightIcon className={currentPage === totalPages ? "opacity-50" : ""} />
                </button>
            </div>

        </div>
    )
}