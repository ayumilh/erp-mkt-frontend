import HamburgerContent from '../../Drawer/mobile/HamburgerContent';
import ActionsHeader from '../../ActionsHeader';

import AnuncioCopiadoHeader from './AnuncioCopiadoHeader';
import TitlePage from '../../Geral/TitlePage';

const AnuncioCopiadoContent = () => {
  return (
    <div className='w-full px-4 lg:px-0 lg:mx-5 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center'>
    <div className="w-full lg:w-[876px] xl:w-[1270px] flex justify-between items-center h-12 pt-4 mb-8">
      <div className='flex items-center'>
        <HamburgerContent/>
        <TitlePage title='Anúncios copiados'/>
      </div>
      <ActionsHeader/>
    </div>

    <div className='w-full flex flex-col items-center' style={{height: '1000px'}}>
      <AnuncioCopiadoHeader/>
      {/* <ProdutosActionsFilter/> */}
    </div>
  </div>
  )
}

export default AnuncioCopiadoContent