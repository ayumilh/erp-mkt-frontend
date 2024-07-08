import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import ChartFilterLojas from '@/components/Geral/Dropdown/ChartFilterLojas'
import { ChartTypeSelector } from '@/components/Geral/Dropdown/ChartTypeSelector'


const AreaSazonaisChart = dynamic(() => import('./AreaSazonaisChart'), { ssr: false });

export const AreaContent = () => {
  const [isOpenEmitir, setIsOpenEmitir] = useState(false)
  const [chartTypeSelected, setChartTypeSelected] = useState('bar');
  const [selectedChartType, setSelectedChartType] = useState('bar');
  
  const handleBtnloja = () => {
    setIsOpenEmitir(!isOpenEmitir);
  }

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenuChart = () => setIsOpen(!isOpen);

  const menuLojaRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuLojaRef.current && !menuLojaRef.current.contains(event.target)) {
        setIsOpenEmitir(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuLojaRef]);

  const menuChartRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuChartRef.current && !menuChartRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuChartRef]);

  return (
    <div className='bg-primaria-900 shadow-md rounded-3xl w-full p-5 md:px-4 md:py-8 xl:px-6'>
      <div className='pb-5'>
        <div className='flex items-end flex-col'>
          <h2 className='mb-1 md:mb-2 text-sm md:text-base text-neutral-800 font-semibold'>Tendências Sazonais</h2>
          <span className='ml-2 md:ml-4 text-base md:text-2xl text-neutral-800 font-medium'>R$9.032,98</span>
        </div>
        <div className='flex gap-2 md:gap-4 items-center'>
          <ChartFilterLojas />
          <ChartTypeSelector onChartTypeSelected={setChartTypeSelected} />
        </div>
      </div>
      <AreaSazonaisChart />
    </div>
  )
}
