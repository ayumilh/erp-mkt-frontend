import HamburgerContent from '../../Drawer/mobile/HamburgerContent';
import ActionsHeader from '../../ActionsHeader';
import BtnBackPage from '../../Geral/Button/BtnBackPage';
import AnuncioCopiadoHeader from './AnuncioCopiadoHeader';
import TitlePage from '../../Geral/TitlePage';
import Breadcrumbs from '../../Geral/Breadcrumbs';

const AnuncioCopiadoContent = () => {
    const breadcrumbPaths = [
        { label: 'Produtos', href: '/produtos' },
        { label: 'Anuncio Copiado', href: '/produtos/AnuncioCopiado' }
    ];
    return (
        <div className='w-full px-4 lg:px-0 lg:mx-5 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center'>
            <div className="w-full lg:w-[876px] xl:w-[1270px] flex justify-between items-center h-12 pt-4 mb-8">
                <div className='flex items-center'>
                    <HamburgerContent />
                    <div className='relative lg:bottom-4'>
                        <BtnBackPage modal={false} />
                    </div>
                    <Breadcrumbs paths={breadcrumbPaths} />
                    <TitlePage title='Anúncios copiados' />
                </div>
                <ActionsHeader />
            </div>

            <div className='w-full flex flex-col items-center' style={{ height: '1000px' }}>
                <AnuncioCopiadoHeader />
                {/* <ProdutosActionsFilter/> */}
            </div>
        </div>
    )
}

export default AnuncioCopiadoContent