'use client'
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const AreaSazonaisChart = () => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    },
    colors: ['#695DC5'],
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        },
      },
      title: {
        text: 'Price'
      },
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0)
        }
      }
    }
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="area" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default AreaSazonaisChart;