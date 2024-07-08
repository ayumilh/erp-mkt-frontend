'use client'
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const PieRankingChart = () => {
  const [chartData, setChartData] = useState({
    series: [35, 58, 23],
    options: {
      chart: {
        width: 380,
        type: 'polarArea',
      },
      colors: ['#624DE3', '#8574FF', '#4B37B2' ],
      labels: ['Rose A', 'Rose B', 'Rose C'],
      fill: {
        opacity: 1
      },
      stroke: {
        width: 1,
        colors: undefined
      },
      yaxis: {
        show: false
      },
      legend: {
        position: 'bottom'
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0
          },
          spokes: {
            strokeWidth: 0
          },
        }
      },
    }
  })

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="polarArea" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default PieRankingChart;