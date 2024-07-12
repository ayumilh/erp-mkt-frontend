'use client'
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BtnBorder } from '@/components/Geral/Button/BtnBorder';
import { DropdownSelectOrAll } from '@/components/Geral/Button/DropdownSelectOrAll';

export const EnviadosMenuMoreResponsive = ({showCheckboxes, showCheckboxesAll, setShowCheckboxes, setShowCheckboxesAll, shippingIdOrder}) => {
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
    <div className="border-l-indigo-200 w-full flex items-center justify-start pl-6 md:pl-4 py-4 gap-3 sticky top-0 left-0 z-40 bg-primaria-900 " ref={menuMoreVertRef}>
    {isMobile ? (<>
      <button onClick={handleOpenMenu}>
        <MoreVertIcon className="h-5 w-5" />
      </button>
      {isOpenMenu && (
        <div className="top-10 left-10 absolute z-10 mt-3 px-2 rounded-md bg-white">
         {/* <DropdownSelectOrAll 
            title={'Enviar'}
            setShowCheckboxes={setShowCheckboxes} 
            showCheckboxes={showCheckboxes} 
            setShowCheckboxesAll={setShowCheckboxesAll} 
            showCheckboxesAll={showCheckboxesAll}
          /> */}
          <BtnBorder title="Filtrar"/>
          <BtnBorder title="Editar em massa"/>
        </div>
      )}
    </>) : (<>
      {/* <DropdownSelectOrAll 
        title={'Enviar'}
        setShowCheckboxes={setShowCheckboxes} 
        showCheckboxes={showCheckboxes} 
        setShowCheckboxesAll={setShowCheckboxesAll} 
        showCheckboxesAll={showCheckboxesAll}
      /> */}
      
      <BtnBorder title="Filtrar"/>
      <BtnBorder title="Editar em massa"/>
    </>)}

      {/* {(showCheckboxes || showCheckboxesAll) && 
        <div className='left-12'>
          <BtnImprimir shippingIdOrder={shippingIdOrder} />
        </div>
      } */}
    </div>
  )
}
