'use client'
import HamburgerContent from '@/components/Drawer/mobile/HamburgerContent';
import ActionsContent from '@/components/Config/ActionsConfig/ActionsContent';
import TitlePage from '@/components/Geral/TitlePage';
import NfActionsFilter from '../NfActionsFilter';
import NfConfigHeader from './NfConfigHeader';
import NfConfigTabela from './NfConfigTabela';
import Breadcrumbs from '@/components/Geral/Breadcrumbs';
import BtnBackPage from '@/components/Geral/Button/BtnBackPage';


const NfConfigContent = () => {
    const breadcrumbPaths = [
        { label: 'Pedidos', href: '/pedidos' },
        { label: 'Notas fiscais', href: '/pedidos/nf' },
        { label: 'Notas fiscais', href: '/nf' }
    ];
    return (
        <div className='w-full px-4 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center'>
            <div className="w-full flex justify-between items-center h-12 pt-5">
                <div className='flex items-center'>
                    <HamburgerContent />
                    <div className='relative bottom-4'>
                        <BtnBackPage modal={false} />
                    </div>
                    <Breadcrumbs paths={breadcrumbPaths} />
                    <TitlePage title='Configurações da NF-e' />
                </div>
                <ActionsContent />
            </div>

            <div className='w-full flex flex-col items-center mt-7 lg:mb-10' style={{ height: '1000px' }}>
                <NfConfigHeader />
                <NfActionsFilter />
                <NfConfigTabela />
            </div>
        </div>
    )
}

export default NfConfigContent