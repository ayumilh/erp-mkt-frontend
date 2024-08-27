'use client'
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartPie = () => {
  const [chartData, setChartData] = useState({
    series: [100, 25, 50, 25],
    options: {
      chart: {
        height: 160,
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
      }
    }
  });

  return (
    <div className="w-full px-3">
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="donut" height={160} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ChartPie;