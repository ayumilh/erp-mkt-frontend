'use client'
import HamburgerContent from '@/components/Drawer/mobile/HamburgerContent';
import ActionsHeader from '@/components/ActionsHeader';
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
        <div className='w-full px-4 lg:px-0 lg:mx-5 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center'>
            <div className="w-full lg:w-[876px] xl:w-[1270px] flex justify-between items-center h-12 pt-4 mb-8">
                <div className='flex items-center'>
                    <HamburgerContent />
                    <div className='relative bottom-4'>
                        <BtnBackPage modal={false} />
                    </div>
                    <Breadcrumbs paths={breadcrumbPaths} />
                    <TitlePage title='Configurações da NF-e' />
                </div>
                <ActionsHeader />
            </div>

            <div className='w-full flex flex-col items-center' style={{ height: '1000px' }}>
                <NfConfigHeader />
                <NfActionsFilter />
                <NfConfigTabela />
            </div>
        </div>
    )
}

export default NfConfigContent