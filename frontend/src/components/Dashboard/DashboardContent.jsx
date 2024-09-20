import HamburgerContent from '../Drawer/mobile/HamburgerContent';
import ActionsHeader from '../ActionsHeader';
import DashboardTarefas from './DashboardTarefas';
import ChartLojasContent from './LineVendasPorLojas/ChartLojasContent';
import PieAnalysisContent from './PieAnalysis/PieAnalysisContent';
import TitlePage from '../Geral/TitlePage';
import { DashboardResumoVendas } from './ResumoVendas/DashboardResumoVendas';
import QuickActions from './QuickActions';


const DashboardContent = () => {
  return (
    <div className='w-full px-4 lg:px-0 lg:mx-4 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center'>
      <div className="w-full flex justify-between items-center h-12 pt-5">
        <div className='flex items-center'>
          <HamburgerContent/>
          <TitlePage title='Dashboard'/>
        </div>
        <ActionsHeader/>
      </div>

      <div className='max-w-[373px] md:max-w-[740px] lg:max-w-[760px] xl:max-w-screen-xl 2xl:max-w-screen-2xl flex flex-col items-center lg:mb-10'>
        <div className='lg:flex w-full'>
          <DashboardResumoVendas />
          <QuickActions />
        </div>
        <div className='lg:flex w-full flex-col xl:flex-row lg:gap-7'>
          <div className='w-full xl:w-2/3'>
            <DashboardTarefas />
          </div>
          <div className='w-full xl:w-1/3'>
            <PieAnalysisContent />
          </div>
        </div>

        <div className='lg:flex w-full flex-col xl:flex-row lg:gap-7'>
          <div className='w-full xl:w-2/3'>
            <ChartLojasContent/>
          </div>
          <div className='w-full xl:w-1/3'>
             <PieAnalysisContent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardContent