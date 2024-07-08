'use client'
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const MultipleYStep = () => {
  const [chartData, setChartData] = useState({
    series: [{
      name: 'Website Blog',
      type: 'column',
      data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1, 1, 4],
      },
      xaxis: {
        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
      },
      yaxis: [
        {
          min: 0,
          seriesName: 'Income',
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#008FFB',
          },
          labels: {
            style: {
              colors: '#008FFB',
            },
          },
          title: {
            text: 'Income (thousand crores)',
            style: {
              color: '#008FFB',
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        {
          min: 0,
          seriesName: 'Cashflow',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#00E396',
          },
          labels: {
            style: {
              colors: '#00E396',
            },
          },
          title: {
            text: 'Operating Cashflow (thousand crores)',
            style: {
              color: '#00E396',
            },
          },
        },
        {
          seriesName: 'Revenue',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#FEB019',
          },
          labels: {
            style: {
              colors: '#FEB019',
            },
          },
          title: {
            text: 'Revenue (thousand crores)',
            style: {
              color: '#FEB019',
            },
          },
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: 'topLeft',
          offsetY: 30,
          offsetX: 60,
        },
      },
      legend: {
        horizontalAlign: 'left',
        offsetX: 40,
      }
    },
  }); 

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={290} />
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
  ) 
};

export default MultipleYStep;