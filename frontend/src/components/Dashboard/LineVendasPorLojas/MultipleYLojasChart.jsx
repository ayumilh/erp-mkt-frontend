'use client'
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import dayjs from 'dayjs';

const MultipleYLojasChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'candle',
        data: [
          { x: new Date(1538778600000), y: [6629.81, 6650.5, 6623.04, 6633.33] },
          { x: new Date(1538780400000), y: [6632.01, 6643.59, 6620, 6630.11] },
        ]
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'candlestick',
        toolbar: {
          autoSelected: 'pan',
          show: false
        },
      },
      colors: ['#4B37B2', '#ff0000'],
      annotations: {
        xaxis: [
          {
            x: 'Oct 06 14:00',
            borderColor: '#00E396',
            label: {
              borderColor: '#00E396',
              style: {
                fontSize: '12px',
                color: '#fff',
                background: '#00E396'
              },
              orientation: 'horizontal',
              offsetY: 7,
              text: 'Annotation Test'
            }
          }
        ]
      },
      tooltip: {
        enabled: true,
      },
      xaxis: {
        type: 'category',
        labels: {
          formatter: function(val) {
            return dayjs(val).format('MMM DD HH:mm');
          }
        }
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    }

  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
      </div>
      <div id="html-dist"></div>
      <div className='flex mt-6 justify-around items-center'>
        <button className='bg-violet-400 hover:bg-gray-200 rounded-lg p-2 font-medium text-neutral-800 transition duration-300 ease-out'>1D</button>
        <button className='hover:bg-gray-200 rounded-lg p-2 text-sm font-medium text-neutral-800 transition duration-300 ease-out'>1M</button>
        <button className='hover:bg-gray-200 rounded-lg p-2 text-sm font-medium text-neutral-800 transition duration-300 ease-out'>3M</button>
        <button className='hover:bg-gray-200 rounded-lg p-2 text-sm font-medium text-neutral-800 transition duration-300 ease-out'>6M</button>
        <button className='hover:bg-gray-200 rounded-lg p-2 text-sm font-medium text-neutral-800 transition duration-300 ease-out'>12M</button>
      </div>
    </div>
  );
};

export default MultipleYLojasChart;