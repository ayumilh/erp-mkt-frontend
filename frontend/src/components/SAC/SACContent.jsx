import HamburgerContent from '../Drawer/mobile/HamburgerContent';
import ActionsHeader from '../ActionsHeader';
import TitlePage from '../Geral/TitlePage';
import SACHeader from './SACHeader';
import SACActionsFilter from './SACActionsFilter';
import SACTabela from './SACTabela';

const SACContent = () => {
  return (
    <div className='w-full xl:mx-0 lg:pt-6'>
      <div className="w-full xl:max-w-[1264px] flex justify-between items-center h-12 pt-4 px-6 xl:px-0 mx-auto mb-8">
        <div className='flex items-center'>
          <HamburgerContent/>
          <TitlePage title='Feedback central'/>
        </div>
        <ActionsHeader/>
      </div>

      <div className='mx-auto flex flex-col items-center' style={{height: '1500px'}}>
        <SACHeader />

        <SACActionsFilter />
        <SACTabela />
      </div>
    </div>
  )
}

export default SACContent