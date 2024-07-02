'use client'
import  { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const LineBlockAnalise = () => {
  const [chartData, setChartData] = useState({
    series: [{
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    options: {
      chart: {
        height: 100,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      colors: ['#8b5cf6'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      grid: {
        show: false,
      },
      xaxis: {
        categories: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep' ],
        label: {
          style: {
            colors: 'rgba(0, 0, 0, 0)',
          }  
        },
      }
    },
  });

  return (
    <div className="w-[100px] lg:mx-0 xl:min-w-full px-4 lg:px-5 xl:px-8 py-5 xl:py-7 mb-7 lg:mb-0 mx-2 xs:mx-auto">
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={300} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default LineBlockAnalise;