import VendasRow from './VendasRow';
import { VendasMenuMoreResponsive } from '../Actions/VendasMenuMoreResponsive';

export default function VendasTabela() {
  return (
    <div className="bg-primaria-900 dark:bg-dark-primaria-900 rounded-2xl w-[345px] md:w-[728px] lg:w-[903px] xl:w-[1270px] flex flex-col my-10 overflow-x-auto" style={{ maxHeight: '700px', overflowY: 'auto' }}>      
      <VendasMenuMoreResponsive />
      <table className="table-auto min-w-full">
        <thead>
          <tr>
            <th className="pr-4 pl-6 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Data</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Clientes</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Vendas por Cliente</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Valor de Vendas Canceladas</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Pedidos Cancelados</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Valor de Vendas Válidas</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Pedidos Válidos</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Valor Total de Vendas</th>
            <th className="pr-6 pl-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Total de Pedidos</th>
          </tr>
        </thead>
        <tbody>
          <VendasRow />
        </tbody>
      </table>
    </div>
  );
};
