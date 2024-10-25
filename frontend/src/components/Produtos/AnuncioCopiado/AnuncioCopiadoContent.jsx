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
        <div className='w-full px-4 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center'>
            <div className="w-full flex justify-between items-center h-12 pt-5">
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

            <div className='w-full flex flex-col items-center mt-7 lg:mb-10' style={{ height: '1000px' }}>
                <AnuncioCopiadoHeader />
                {/* <ProdutosActionsFilter/> */}
            </div>
        </div>
    )
}

export default AnuncioCopiadoContent