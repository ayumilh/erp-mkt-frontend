'use client'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { ChartContent } from '@/components/Feedback/Chart/ChartContent';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const DashboardResumoVendas = () => {
  const [data, setData] = useState([]);

  const handleButtonClick = async () => {
    try {
      await axios.post('https://erp-mkt.vercel.app/api/mercadolivre/item-visits');
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };
  
  useEffect(() => {
    handleButtonClick();
    const fetchData = async ()=> {
      try {
        const response = await axios.get('https://erp-mkt.vercel.app/api/mercadolivre/visits');
        const restructuredData = response.data.visits.map((data) => {
          return {
            conversion_rate: data.conversion_rate,
            total_visits: data.total_visits,
          };
        });
        setData(restructuredData);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };
    fetchData();
  }, []);

  
  const firstElement = data.length > 0 ? data[0] : { conversion_rate: 0, total_visits: 0 };

  return (
    <div className='bg-primaria-900 flex flex-col gap-7 lg:flex-row shadow-lg border border-slate-100 rounded-2xl max-w-[373px] md:max-w-[688px] lg:max-w-[876px] xl:min-w-[1270px] lg:mx-0 min-h-max px-4 lg:px-5 xl:pl-8 xl:pr-0 py-5 xl:py-7 mb-7 mx-2 xs:mx-auto'>
      <div className='w-full lg:w-1/2 h-full'>
        <ChartContent />
      </div>

      <div className='w-full lg:w-1/2 flex flex-wrap'>
        <div className='w-1/2 flex flex-col'>
          <div className='items-center'>
            <span className="text-neutral-600 font-medium">visitantes </span>
            <span> <HelpOutlineIcon fontSize='small' className='text-neutral-600 w-4 h-4'/> </span>
          </div>
          <span className='text-2xl font-semibold text-neutral-700'>{firstElement.total_visits}</span>
          <span className="text-neutral-600 font-medium text-sm">vs ontem 38,46% <span className="text-green-500 text-sm font-extrabold">↑</span></span>
        </div>


        <div className='w-1/2 flex flex-col'>
          <div className='items-center'>
            <span className="text-neutral-600 font-medium">visualição da pagina </span>
            <span> <HelpOutlineIcon fontSize='small' className='text-neutral-600 w-4 h-4'/> </span>
          </div>
          <span className='text-2xl font-semibold text-neutral-700'>0</span>
          <span className="text-neutral-600 font-medium text-sm">vs ontem 0,00% <span className="text-green-500 text-sm font-extrabold">↑</span></span>
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
          <span className='text-2xl font-semibold text-neutral-700'>
            {firstElement.conversion_rate}%
          </span>
          <span className="text-neutral-600 font-medium text-sm">vs ontem 0,00% <span className="text-gray-600 text-sm font-extrabold">-</span></span>
        </div>
      </div>
    </div>
  )
}
