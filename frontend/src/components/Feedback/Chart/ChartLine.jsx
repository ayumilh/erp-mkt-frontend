'use client'
import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartLine = () => {
  const [chartData, setChartData] = useState({
    series: [{
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148] 
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: true
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#8b5cf6'],
      dataLabels: {
        enabled: false
      }
    }
  });

  useEffect(() => {
    const data = []; // definir os dados aqui
    let lastDate = new Date().getTime(); // Exemplo de data inicial
    const XAXISRANGE = 7776000000; // Exemplo de intervalo do eixo X

    const getNewSeries = (baseval, yrange) => {
      const newDate = baseval + 86400000;
      if (isNaN(newDate)) {
        console.error("newDate is NaN");
        return;
      }
      const newData = {
        x: newDate,
        y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
      };
      if (isNaN(newData.y)) {
        console.error("newData.y is NaN");
        return;
      }
      data.push(newData);
      lastDate = newDate;
    };

    const options = {
      series: [{
        data: data.slice()
      }],
      chart: {
        id: 'realtime',
        height: 200,
        type: 'line',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      colors: ['#5938be'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime',
        range: XAXISRANGE,
      },
      yaxis: {
        max: 100
      },
      legend: {
        show: false
      },
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    let intervalRuns = 0;
    const interval = window.setInterval(() => {
      intervalRuns++;
      getNewSeries(lastDate, {
        min: 10,
        max: 90
      });

      chart.updateSeries([{
        data: data
      }]);

      if (intervalRuns === 2 && window.isATest === true) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-3">
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={120} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ChartLine;