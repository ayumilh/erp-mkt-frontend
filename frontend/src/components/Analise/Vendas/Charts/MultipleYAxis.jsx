import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactApexChart from 'react-apexcharts';

const MultipleYAxis = ({selectedItem}) => {
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
          console.log(restructuredData);
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
      },
    },
  })

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
  );
};

export default MultipleYAxis;