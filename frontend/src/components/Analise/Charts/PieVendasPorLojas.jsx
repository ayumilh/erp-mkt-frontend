import { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CandlestickChartOutlinedIcon from '@mui/icons-material/CandlestickChartOutlined';

const PieVendasPorLojas = () =>{
  const [series, setSeries] = useState([44, 55, 13, 43, 22]);

  const [options, setOptions] = useState({
    chart: {
      width: 380,
      height: 380,
      type: 'pie',
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    colors: ['#8b5cf6', '#8064e8', '#7254da', '#6646cc', '#5938be', '#6a5ac8', '#7b6cd2', '#8c7edc', '#9d90e6', '#aea2f0'],
    legend: {
      position: 'bottom'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
      }
    }]
  });

  const [isOpenEmitir, setIsOpenEmitir] = useState(false)
  const handleBtnloja = () => {
    setIsOpenEmitir(!isOpenEmitir);
  }

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

  return (
    <div className='bg-primaria-900 shadow-md rounded-3xl w-full mt-7 lg:mt-0 px-3 py-4 md:px-4 md:py-5 xl:px-6 xl:py-8'>
      <div className='flex justify-between'>
        <div>
          <h2 className='mb-1 md:mb-2 text-sm md:text-base text-neutral-800 font-semibold'>Produtos mais Vendidos</h2>
          <span className='ml-2 md:ml-4 text-base md:text-2xl text-neutral-800 font-medium'>R$4.932,98</span>
        </div>
        <div className='flex gap-2 md:gap-4 items-center'>
          <CandlestickChartOutlinedIcon className='h-8 w-8 text-neutral-700 hover:text-black transition duration-500 ease-in-out' />
          <div className='relative inline-block text-left' ref={menuLojaRef}>
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
        </div>
      </div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="pie" height={400} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default PieVendasPorLojas;