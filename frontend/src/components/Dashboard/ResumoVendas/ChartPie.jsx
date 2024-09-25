'use client'
import { useState, useEffect, useContext } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ThemeContext } from '../../../contexts/ThemeContext';

const ChartPie = () => {
  const { theme } = useContext(ThemeContext);

  const [chartData, setChartData] = useState({
    series: [100, 25, 50, 25],
    options: {
      chart: {
        height: 260,
        type: 'donut',
        zoom: {
          enabled: true
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
      labels: ['Total de Vendas', 'Novos', 'Em Andamento', 'Cancelados'],
      dataLabels: {
        enabled: false
      },
      legend: {
        labels: {
          colors: theme === 'dark' ? ['#ffffff'] : ['#000000']
        }
      }
    }
  });

  useEffect(() => {
    setChartData((prevData) => ({
      ...prevData,
      options: {
        ...prevData.options,
        legend: {
          labels: {
            colors: theme === 'dark' ? ['#ffffff'] : ['#000000']
          }
        }
      }
    }));
  }, [theme]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="donut" height={300} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ChartPie;