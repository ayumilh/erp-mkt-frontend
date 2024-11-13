'use client'
import { useState, useEffect, useContext } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ThemeContext } from '../../../contexts/ThemeContext';

const PieRankingChart = () => {
  const { theme } = useContext(ThemeContext);

  const [chartData, setChartData] = useState({
    series: [35, 58, 23],
    options: {
      chart: {
        width: 380,
        type: 'polarArea',
        background: 'transparent',
      },
      colors: ['#624DE3', '#8574FF', '#4B37B2'],
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
      theme: {
        mode: theme === 'dark' ? 'dark' : 'light',
        monochrome: {
          enabled: false,
          color: theme === 'dark' ? '#ffffff' : '#000000',
          shadeTo: 'light',
          shadeIntensity: 0.65
        }
      }
    }
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="polarArea" height={320} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default PieRankingChart;