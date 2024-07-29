import HamburgerContent from '../Drawer/mobile/HamburgerContent';
import ActionsHeader from '../ActionsHeader';
import TitlePage from '../Geral/TitlePage';
import SACHeader from './SACHeader';
import SACActionsFilter from './SACActionsFilter';
import SACTabela from './SACTabela';

import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { ChartContent } from './Chart/ChartContent';

const SACContent = () => {
  return (
    <div className='w-full xl:mx-0 lg:pt-6'>
      <div className="w-full xl:max-w-[1264px] flex justify-between items-center h-12 pt-4 px-6 xl:px-0 mx-auto mb-8">
        <div className='flex items-center'>
          <HamburgerContent/>
          <TitlePage title='Informações gerenciais'/>
        </div>
        <ActionsHeader/>
      </div>

      <div className='mx-auto flex flex-col items-center' style={{height: '1500px'}}>
        <SACHeader />
        <div className='w-full lg:w-[876px] xl:w-[1270px] flex gap-20 my-10'>
          <div className='w-1/2 h-full'>
            <ChartContent />
          </div>

          <div className='w-1/2 flex flex-wrap'>
            <div className='w-1/2 flex flex-col'>
              <div className='items-center'>
                <span className="text-neutral-600 font-medium">visitantes </span>
                <span> <HelpOutlineIcon fontSize='small' className='text-neutral-600 w-4 h-4'/> </span>
              </div>
              <span className='text-2xl font-semibold text-neutral-700'>20</span>
              <span className="text-neutral-600 font-medium text-sm">vs ontem 38,46% <span className="text-green-500 text-sm font-extrabold">↑</span></span>
            </div>


            <div className='w-1/2 flex flex-col'>
              <div className='items-center'>
                <span className="text-neutral-600 font-medium">visualição da pagina </span>
                <span> <HelpOutlineIcon fontSize='small' className='text-neutral-600 w-4 h-4'/> </span>
              </div>
              <span className='text-2xl font-semibold text-neutral-700'>37</span>
              <span className="text-neutral-600 font-medium text-sm">vs ontem 40,00% <span className="text-green-500 text-sm font-extrabold">↑</span></span>
            </div>

            <hr className='w-full my-4'/>

            <div className='w-1/2 flex flex-col'>
              <div className='items-center'>
                <span className="text-neutral-600 font-medium">pedidos </span>
                <span> <HelpOutlineIcon fontSize='small' className='text-neutral-600 w-4 h-4'/> </span>
              </div>
              <span className='text-2xl font-semibold text-neutral-700'>0</span>
              <span className="text-neutral-600 font-medium text-sm">vs ontem 0 <span className="text-gray-600 text-sm font-extrabold">-</span></span>
            </div>

            <div className='w-1/2 flex flex-col'>
              <div className='items-center'>
                <span className="text-neutral-600 font-medium">taxa de conversão </span>
                <span> <HelpOutlineIcon fontSize='small' className='text-neutral-600 w-4 h-4'/> </span>
              </div>
              <span className='text-2xl font-semibold text-neutral-700'>0,00% </span>
              <span className="text-neutral-600 font-medium text-sm">vs ontem 0,00% <span className="text-gray-600 text-sm font-extrabold">-</span></span>
            </div>
          </div>
        </div>
        <SACActionsFilter />
        <SACTabela />
      </div>
    </div>
  )
}

export default SACContent