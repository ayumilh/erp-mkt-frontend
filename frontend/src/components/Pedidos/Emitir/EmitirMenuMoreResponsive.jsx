import { useEffect, useRef, useState } from 'react';
import { searchUserId } from '@/utils/searchUserId';
import axios from 'axios';
import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DropdownSelectOrAll } from '@/components/Geral/Dropdown/DropdownSelectOrAll';
import BtnActions from '@/components/Geral/Button/BtnActions';
import { BtnBorder } from '@/components/Geral/Button/BtnBorder';
import SuccessNotification from '@/components/Geral/Notifications/SuccessNotification';
import ErrorNotification from '@/components/Geral/Notifications/ErrorNotification';


export const EmitirMenuMoreResponsive = ({ showCheckboxes, showCheckboxesAll, setShowCheckboxes, setShowCheckboxesAll, shippingIdOrder }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [statusRequestSync, setStatusRequestSync] = useState(null);

    const handleOpenMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    }

    const emitirPedidos = async () => {
        if (!shippingIdOrder || shippingIdOrder.length === 0) return

        const userId = searchUserId();
        if (!userId) return;

        console.log('shippingIdOrder', shippingIdOrder);

        try {
            const response = await axios.post('https://erp-mkt.vercel.app/api/mercadolivre/issueNote', {
                ordersBatch: shippingIdOrder,
                userId: userId
            });
            if (response.status === 200) {
                setStatusRequestSync(true);
            } else {
                setStatusRequestSync(false);
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            setStatusRequestSync(false);
        }
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
        <div className="relative border-l-indigo-200 w-full flex items-center justify-start pl-6 md:pl-4 py-4 gap-3 top-0 left-0 z-40 bg-primaria-900 dark:bg-dark-primaria-900" ref={menuMoreVertRef}>
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
                        <DropdownSelectOrAll
                            title={'Emitir'}
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
                    title={'Emitir'}
                    setShowCheckboxes={setShowCheckboxes}
                    showCheckboxes={showCheckboxes}
                    setShowCheckboxesAll={setShowCheckboxesAll}
                    showCheckboxesAll={showCheckboxesAll}
                /> */}
                <BtnBorder title="Filtrar" />
                <BtnBorder title="Editar em massa" />
            </>)}

            <div className='left-12'>
                <BtnActions title="Emitir" onClick={emitirPedidos} color="ativado" padding="xs" rounded="lg" />
            </div>

            {statusRequestSync === true && <SuccessNotification message="Pedidos emitidos com sucesso" />}
            {statusRequestSync === false && <ErrorNotification message="Erro ao emitir produtos" />}
        </div>
    )
}
