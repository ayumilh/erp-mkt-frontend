import HamburgerContent from '../Drawer/mobile/HamburgerContent';
import ActionsHeader from '../ActionsHeader';
import DashboardTarefas from './DashboardTarefas';
import ChartLojasContent from './ChartLojas/ChartLojasContent';
import PieAnalysisContent from './PieAnalysis/PieAnalysisContent';
import QuickActions from '../QuickActions';
import CodeMagalu from '../Token/CodeMagalu';
import CodeToken from '../Token/CodeToken';
import TitlePage from '../Geral/TitlePage';


const DashboardContent = () => {
  return (
    <div className='w-full lg:ml-7 xl:mx-10 xl:flex xl:flex-col xl:items-center lg:pt-6'>
      <div className="w-full xl:max-w-[1264px] flex justify-between items-center h-12 pt-4 px-6 xl:px-0 mx-auto mb-8">
        <div className='flex items-center'>
          <HamburgerContent/>
          <TitlePage title='Dashboard'/>
        </div>
        <ActionsHeader/>
      </div>

      <div className='xl:mx-auto'>
        <div className='lg:flex lg:w-full lg:gap-7'>
          <DashboardTarefas />
          <PieAnalysisContent />
        </div>

        <div className='lg:flex lg:w-full lg:gap-7'>
          <ChartLojasContent/>
          <QuickActions/>
        </div>
      </div>
    </div>
  )
}

export default DashboardContent