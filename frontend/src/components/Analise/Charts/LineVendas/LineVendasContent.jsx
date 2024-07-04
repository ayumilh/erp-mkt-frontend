import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import BarChartIcon from '@mui/icons-material/BarChart';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

const LineVendasChart = dynamic(() => import('./LineVendasChart'), { ssr: false });

export const LineVendasContent = () => {
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
      <div>
        <div className='flex items-end flex-col'>
          <h2 className='mb-1 md:mb-2 text-sm md:text-base text-neutral-800 font-semibold'>Tendências de Vendas</h2>
          <span className='ml-2 md:ml-4 text-base md:text-2xl text-neutral-800 font-medium'>R$9.032,98</span>
        </div>
        <div className='flex gap-2 md:gap-4 items-center'>
          <div className='flex items-center text-left' ref={menuLojaRef}>
            <div className='relative text-left pr-3'>
              <button
                aria-controls="btn-pie"
                aria-haspopup="true"
                className="w-full h-8 px-3 my-1 md:rounded-lg md:border md:border-gray-200 md:hover:border-[#c7c7c7] focus:outline-none focus:ring-1 md:focus:ring-[#d4d4d4] flex items-center justify-start md:justify-center"
                onClick={handleBtnloja}
              >
                <span className="opacity-90 hover:opacity-100 text-sm font-medium">Loja</span>
                <KeyboardArrowDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
              </button>

              {isOpenEmitir && (
                <div className="max-w-max top-9 right-0 absolute z-10 mt-2 px-2 rounded-md bg-white">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button className="flex w-full opacity-90 hover:text-black text-sm font-medium px-2 my-2 hover:bg-gray-100" role="menuitem">
                      Shoope
                    </button>
                    <button className="flex w-40 opacity-90 hover:text-black text-sm font-medium px-2 my-2 hover:bg-gray-100" role="menuitem">
                      Mercado Livre
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className='w-full relative text-left'>
              <button onClick={toggleMenuChart}>
                {chartTypeSelected === 'bar' ? <BarChartIcon className="text-neutral-700 hover:text-black mr-2 w-3 h-3 cursor-pointer" /> : <CandlestickChartIcon className="text-neutral-700 hover:text-black mr-2 w-3 h-3 cursor-pointer" />}
              </button>

              {isOpen && (
                <div className="top-6 absolute z-10 mt-2 px-2 rounded-md bg-white" ref={menuChartRef}>
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button onClick={() => handleChartTypeChange('bar')} className="flex items-center w-full px-2 my-2 focus:bg-primaria-900" role="menuitem">
                      <span> <BarChartIcon className="text-neutral-700 hover:text-black mr-2 w-3 h-3 cursor-pointer" /> </span>
                      <span className='text-neutral-800 hover:text-black text-sm font-medium'>Gráfico barra</span>
                    </button>
                    <button onClick={() => handleChartTypeChange('candlestick')} className="flex items-center w-full px-2 my-2 focus:bg-primaria-900" role="menuitem">
                      <span> <CandlestickChartIcon className="text-neutral-700 hover:text-black mr-2 w-3 h-3 cursor-pointer" /> </span>
                      <span className='text-neutral-800 hover:text-black text-sm font-medium'>Gráfico candle</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <LineVendasChart />
    </div>
  )
}
