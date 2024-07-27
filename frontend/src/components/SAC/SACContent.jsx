import HamburgerContent from '../Drawer/mobile/HamburgerContent';
import ActionsHeader from '../ActionsHeader';
import TitlePage from '../Geral/TitlePage';
<<<<<<< HEAD
import SACHeader from './SACHeader';
import SACActionsFilter from './SACActionsFilter';
import SACTabela from './SACTabela';
=======
import {BtnSyncPerguntas} from './BtnSyncPerguntas';

>>>>>>> 3c2ac6af09a99fe668e9af77d154d42a620d2a15

const SACContent = () => {
  return (
    <div className='w-full xl:mx-0 lg:pt-6'>
      <div className="w-full xl:max-w-[1264px] flex justify-between items-center h-12 pt-4 px-6 xl:px-0 mx-auto mb-8">
        <div className='flex items-center'>
          <HamburgerContent/>
          <TitlePage title='SAC'/>
        </div>
        <ActionsHeader/>
      </div>

      <div className='mx-auto flex flex-col justify-center items-center'>
<<<<<<< HEAD
        <SACHeader />
        <SACActionsFilter />
        <SACTabela />
=======
        <BtnSyncPerguntas/>
>>>>>>> 3c2ac6af09a99fe668e9af77d154d42a620d2a15
      </div>
    </div>
  )
}

export default SACContent