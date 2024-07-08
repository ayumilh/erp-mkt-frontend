import { useState, useEffect, useRef } from 'react';
import BarChartIcon from '@mui/icons-material/BarChart';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';

export const ChartTypeSelector = ({ onChartTypeSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenuChart = () => setIsOpen(!isOpen);

  const handleChartTypeChange = (type) => {
    onChartTypeSelected(type);
  };

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
    <div className='flex'>
      <div className='w-full relative inline-block text-left'>
        <button onClick={toggleMenuChart}>
          {onChartTypeSelected === 'bar' ? <BarChartIcon fontSize='medium' className="text-neutral-700 hover:text-neutral-800 active:text-black mr-2 cursor-pointer" /> : <CandlestickChartIcon fontSize='medium' className="text-neutral-700 hover:text-neutral-800 active:text-black mr-2 cursor-pointer" />}
        </button>

        {isOpen && (
          <div className="top-10 absolute z-10 rounded-md bg-white" ref={menuChartRef}>
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <button onClick={() => handleChartTypeChange('bar')} className="flex items-center w-full px-2 active:bg-gray-200 hover:bg-primaria-900 transition duration-300 ease-in-out" role="menuitem">
                <span> <BarChartIcon fontSize='small' className="text-neutral-700 hover:text-black cursor-pointer transition duration-300 ease-in-out" /> </span>
                <span className='w-full text-neutral-600 py-2 hover:text-black text-sm font-medium whitespace-nowrap transition duration-300 ease-in-out'>Gráfico barra</span>
              </button>
              <button onClick={() => handleChartTypeChange('candlestick')} className="flex items-center w-full px-2 active:bg-gray-200 hover:bg-primaria-900 transition duration-300 ease-in-out" role="menuitem">
                <span> <CandlestickChartIcon fontSize='small' className="text-neutral-700 hover:text-black mr-2 cursor-pointer transition duration-300 ease-in-out" /> </span>
                <span className='w-full text-neutral-600 py-2 hover:text-black text-sm font-medium whitespace-nowrap transition duration-300 ease-in-out'>Gráfico candle</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
