'use client'
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import { DropdownSelectOrAll } from '../../Geral/Button/DropdownSelectOrAll';
import { BtnImprimir } from '../Imprimir/BtnImprimir';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

export const RetiradaMenuMoreResponsive = ({showCheckboxes, showCheckboxesAll, setShowCheckboxes, setShowCheckboxesAll, shippingIdOrder, currentPage, totalPages, rowsPerPage, handlePageChange, handleRowsPerPageChange}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  }

  const menuMoreVertRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuMoreVertRef.current && !menuMoreVertRef.current.contains(event.target)) {
        setIsOpenMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuMoreVertRef])

  return (
    <div className="relative border-l-indigo-200 w-full flex items-center justify-start pl-6 md:pl-4 py-4 gap-3 top-0 left-0 z-40 bg-primaria-900" ref={menuMoreVertRef}>
      {isMobile ? (<>
        <button onClick={handleOpenMenu}>
          <MoreVertIcon className="h-5 w-5" />
        </button>
        {isOpenMenu && (
          <div className="top-10 left-10 absolute z-10 mt-3 px-2 rounded-md bg-white">
          <DropdownSelectOrAll 
              title={'Imprimir'}
              setShowCheckboxes={setShowCheckboxes} 
              showCheckboxes={showCheckboxes} 
              setShowCheckboxesAll={setShowCheckboxesAll} 
              showCheckboxesAll={showCheckboxesAll}
            />
            <div>
              <button
                aria-controls="btn-pie"
                aria-haspopup="true"
                className="w-full md:h-8 px-2 my-1 flex items-center justify-start"
              >
                <FilterListIcon className="mr-1 h-4 md:h-5 w-4 md:w-5" />
                <span className="opacity-90 hover:text-black text-sm font-medium">Filtrar</span>
              </button>
            </div>

            <div>
              <button
                aria-controls="btn-pie"
                aria-haspopup="true"
                className="w-full h-8 px-2 my-1 flex items-center justify-start"
              >
                <EditIcon className="mr-1 h-4 md:h-5 w-4 md:w-5" />
                <span className="opacity-90 hover:text-black text-sm font-medium">Editar em massa</span>
              </button>
            </div>
          </div>
        )}
      </>) : (<>
        <DropdownSelectOrAll 
          title={'Imprimir'}
          setShowCheckboxes={setShowCheckboxes} 
          showCheckboxes={showCheckboxes} 
          setShowCheckboxesAll={setShowCheckboxesAll} 
          showCheckboxesAll={showCheckboxesAll}
        />
        
        <div>
          <button
            aria-controls="btn-pie"
            aria-haspopup="true"
            className="h-8 px-2 my-1 rounded-lg border border-gray-200 hover:border-[#c7c7c7] focus:outline-none focus:ring-1 focus:ring-[#d4d4d4] flex items-center justify-center"
          >
            <FilterListIcon className="mr-1 h-4 md:h-5 w-4 md:w-5"/>
            <span className="opacity-90 hover:opacity-100 text-sm font-medium">Filtro</span>
          </button>
        </div>
        <div>
          <button
            aria-controls="btn-pie"
            aria-haspopup="true"
            className="h-8 px-2 my-1 rounded-lg border border-gray-200 hover:border-[#c7c7c7] focus:outline-none focus:ring-1 focus:ring-[#d4d4d4] flex items-center justify-center"
          >
            <EditIcon className="mr-1 h-4 md:h-5 w-4 md:w-5"/>
            <span className="opacity-90 hover:opacity-100 text-sm font-medium">Editar em massa</span>
          </button>
        </div>
      </>)}

      {(showCheckboxes || showCheckboxesAll) && 
        <div className='left-12'>
          <BtnImprimir shippingIdOrder={shippingIdOrder} />
        </div>
      }

<div className="flex items-center gap-2 ml-auto">
        <div>
          <label htmlFor="rowsPerPage" className="text-sm mr-1">Linhas por página:</label>
          <select id="rowsPerPage" value={rowsPerPage} onChange={handleRowsPerPageChange} className="py-1 rounded bg-transparent">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-2 py-1 rounded">
            <KeyboardArrowLeftIcon className={currentPage === 1 ? "opacity-50" : ""} />
          </button>
          <span>{currentPage} de {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-2 py-1 rounded">
            <KeyboardArrowRightIcon className={currentPage === totalPages ? "opacity-50" : ""} />
          </button>
        </div>
      </div>
    </div>
  )
}
