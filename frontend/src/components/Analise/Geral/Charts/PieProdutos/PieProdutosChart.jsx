'use client'
import { useState, useEffect, useRef } from 'react';
import ReactApexChart from 'react-apexcharts';
import BtnGroupChart from '@/components/Geral/Button/BtnGroupChart';

const PieProdutosChart = () =>{
  const [series, setSeries] = useState([44, 55, 13]);

  const [options, setOptions] = useState({
    chart: {
      width: 380,
      height: 380,
      type: 'pie',
    },
    labels: ['Team A', 'Team B', 'Team C'],
    colors: ['#8b5cf6', '#8064e8', '#7254da', '#6646cc', '#5938be', '#6a5ac8', '#7b6cd2', '#8c7edc', '#9d90e6', '#aea2f0'],
    legend: {
      position: 'bottom'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
      }
    }]
  });

  const [isOpenEmitir, setIsOpenEmitir] = useState(false)
  const handleBtnloja = () => {
    setIsOpenEmitir(!isOpenEmitir);
  }

  const menuLojaRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuLojaRef.current && !menuLojaRef.current.contains(event.target)) {
        setIsOpenEmitir(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuLojaRef]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="pie" height={350} />
      </div>
      <div id="html-dist"></div>
      <BtnGroupChart />
    </div>
  );
}

export default PieProdutosChart;