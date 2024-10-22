import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BtnBorder } from '@/components/Geral/Button/BtnBorder';

export const VendasMenuMoreResponsive = () => {
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
        <div className="relative border-l-indigo-200 w-full flex items-center justify-start pl-6 md:pl-4 py-4 gap-3" ref={menuMoreVertRef}>
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
                    <div className="top-10 left-10 absolute z-10 mt-3 px-2 rounded-md bg-white">
                        <BtnBorder title="Filtrar" />
                        <BtnBorder title="Editar em massa" />
                    </div>
                )}
            </>) : (<>
                <BtnBorder title="Filtrar" />
                <BtnBorder title="Editar em massa" />
            </>)}
        </div>
    )
}