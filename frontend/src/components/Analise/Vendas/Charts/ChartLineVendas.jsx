'use client'
import  { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const ChartLineVendas = ({ selectedItem }) => {
  const [sales, setSales] = useState([]);
  const [valoresParaYAxis, setValoresParaYAxis] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get("https://erp-mkt.vercel.app/api/statistics/sales");
        if (response.data && Array.isArray(response.data.statistics)) {
          const restructuredData = response.data.statistics.map((sales) => {
            return {
              Data: sales.Data,
              TotalDePedidos: sales["Total de Pedidos"],
              ValorTotalDeVendas: sales["Valor Total de Vendas"],
              PedidosValidos: sales["Pedidos Válidos"],
              ValorDeVendasValidas: sales["Valor de Vendas Válidas"],
              PedidosCancelados: sales["Pedidos Cancelados"],
              ValorDeVendasCanceladas: sales["Valor de Vendas Canceladas"],
              Clientes: sales.Clientes,
              VendasPorCliente: sales["Vendas por Cliente"],       
            };
          });
          setSales(restructuredData);
        } else {
          setSales([]);
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };
  
    fetchSales();
  }, []);

  const formatarDataParaMes = (dataISO) => {
    const meses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const data = new Date(dataISO);
    return meses[data.getMonth()];
  };

  useEffect(() => {
    const dadosAgrupadosPorMes = sales.reduce((agrupandoDados, sale) => {
      const mes = formatarDataParaMes(sale.Data);
      if (!agrupandoDados[mes]) {
        agrupandoDados[mes] = {
          totalVendas: 0,
          mes
        };
      }
      console.log(selectedItem);
      agrupandoDados[mes].totalVendas += parseFloat(sale[selectedItem]);
      return agrupandoDados;
    }, {});
  
    const dadosArray = Object.values(dadosAgrupadosPorMes);
    const novasCategorias = dadosArray.map(dado => dado.mes);
    const novosValoresParaYAxis = dadosArray.map(dado => dado.totalVendas);
  
    setValoresParaYAxis(novosValoresParaYAxis);
    setChartData(prevChartData => ({
      ...prevChartData,
      series: [{ ...prevChartData.series[0], data: novosValoresParaYAxis }],
      options: {
        ...prevChartData.options,
        xaxis: {
          categories: novasCategorias,
        }
      }
    }));
  }, [sales, selectedItem]);
  

  const [chartData, setChartData] = useState({
    series: [{
      name: "Desktops",
      data: valoresParaYAxis,
    }],
    options: {
      chart: {
        height: 290,
        type: 'line',
        zoom: {
          enabled: true
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
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={290} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ChartLineVendas;