import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { ChartContent } from '@/components/Feedback/Chart/ChartContent';

export const DashboardResumoVendas = () => {
  return (
    <div className='bg-primaria-900 shadow-lg border border-slate-100 rounded-20 w-full lg:w-[876px] xl:w-[1270px] flex gap-20 my-10 lg:mx-0 min-h-max px-4 lg:px-5 xl:pl-8 xl:pr-0 py-5 xl:py-7 mb-7 mx-2 xs:mx-auto'>
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
  )
}
