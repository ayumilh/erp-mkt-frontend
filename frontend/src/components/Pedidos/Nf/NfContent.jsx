'use client'
import HamburgerContent from '../../Drawer/mobile/HamburgerContent';
import ActionsContent from '../../Config/ActionsConfig/ActionsContent';
import TitlePage from '../../Geral/TitlePage';
import NfActionsFilter from './NfActionsFilter';
import NfTabela from './NfTabela';
import NfHeader from './NfHeader';
import Breadcrumbs from '../../Geral/Breadcrumbs';
import BtnBackPage from '../../Geral/Button/BtnBackPage';

const NfContent = () => {
    const breadcrumbPaths = [
        { label: 'Pedidos', href: '/pedidos' },
        { label: 'Notas fiscais', href: '/nf' }
    ];
    return (
        <div className='w-full px-4 lg:px-0 lg:mx-5 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center'>
            <div className="w-full flex justify-between items-center h-12 pt-5">
                <div className='flex items-center'>
                    <div className='relative bottom-4'>
                        <BtnBackPage modal={false} />
                    </div>
                    <HamburgerContent />
                    <Breadcrumbs paths={breadcrumbPaths} />
                    <TitlePage title='Notas fiscais' />
                </div>
                <ActionsContent />
            </div>

            <div className='w-full flex flex-col items-center mt-7 lg:mb-10' style={{ height: '1000px' }}>
                <NfHeader />
                <NfActionsFilter />
                <NfTabela />
            </div>
        </div>
    )
}

export default NfContent