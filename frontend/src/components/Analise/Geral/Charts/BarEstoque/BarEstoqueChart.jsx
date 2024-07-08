import { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CandlestickChartOutlinedIcon from '@mui/icons-material/CandlestickChartOutlined';

const BarEstoqueChart = () => {
  const [series, setSeries] = useState([{
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
  }]);

  const [options, setOptions] = useState({
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 4,
        borderRadiusApplication: 'end',
        horizontal: true,
      }
    },
    colors: ['#8b5cf6', '#8064e8', '#7254da', '#6646cc', '#5938be', '#4d2ab0', '#421ca2', '#371094', '#2c0486', '#210078'], 
    // colors: ['#8b5cf6', '#8064e8', '#7254da', '#6646cc', '#5938be', '#6a5ac8', '#7b6cd2', '#8c7edc', '#9d90e6', '#aea2f0'],
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Calça', 'Prato', 'Pelicula', 'Espatula', 'Relogio', 'Cadeira'],
      font: {
        size: '20px'
      }
    }
  });


  return (
    <div>
      <div id="chart"> 
        <ReactApexChart options={options} series={series} type="bar" height={350} width={450} />
      </div>
      <div id="html-dist"></div>
      <div className='flex justify-around items-center'>
        <button className='bg-violet-400 hover:bg-gray-200 rounded-lg p-2 font-medium text-neutral-800 transition duration-300 ease-out'>1D</button>
        <button className='hover:bg-gray-200 rounded-lg p-2 text-sm font-medium text-neutral-800 transition duration-300 ease-out'>1M</button>
        <button className='hover:bg-gray-200 rounded-lg p-2 text-sm font-medium text-neutral-800 transition duration-300 ease-out'>3M</button>
        <button className='hover:bg-gray-200 rounded-lg p-2 text-sm font-medium text-neutral-800 transition duration-300 ease-out'>6M</button>
        <button className='hover:bg-gray-200 rounded-lg p-2 text-sm font-medium text-neutral-800 transition duration-300 ease-out'>12M</button>
      </div>
    </div>
  );
};

export default BarEstoqueChart
;