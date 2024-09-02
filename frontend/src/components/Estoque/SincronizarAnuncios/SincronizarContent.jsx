import BtnBackPage from '@/components/Geral/Button/BtnBackPage';
import HamburgerContent from "@/components/Drawer/mobile/HamburgerContent"
import ActionsHeader from "../../ActionsHeader"
import SincronizarActionsFilter from "./SincronizarActionsFilter"
import Sincronizartabela from "./Sincronizartabela"
import TitlePage from "@/components/Geral/TitlePage"
import Breadcrumbs from '../../Geral/Breadcrumbs';

const SincronizarContent = () => {
    const breadcrumbPaths = [
        { label: 'Estoque', href: '/estoque' },
        { label: 'Notas fiscais', href: '/nf' }
    ];
    return (
        <div className='w-full xl:mx-0 lg:pt-6'>
            <div className="w-full xl:max-w-[1264px] flex justify-between items-center h-12 pt-4 px-6 xl:px-0 mx-auto mb-8">
                <div className='flex items-center'>
                    <HamburgerContent />
                    <div className='flex items-center justify-center text-center'>
                        <div className='relative bottom-4'>
                            <BtnBackPage modal={false} />
                        </div>
                        <Breadcrumbs paths={breadcrumbPaths} />
                        <TitlePage title='Sincronizar Anúncios' />
                    </div>
                </div>
                <ActionsHeader />
            </div>

            <div className='mx-auto flex flex-col justify-start items-center' style={{ height: '1000px' }}>
                <SincronizarActionsFilter />
                <Sincronizartabela />
            </div>
        </div>
    )
}

export default SincronizarContent