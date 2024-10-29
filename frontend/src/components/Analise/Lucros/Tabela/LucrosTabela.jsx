import LucrosRow from './LucrosRow';
import { LucrosMenuMoreResponsive } from '../Actions/LucrosMenuMoreResponsive';

export default function LucrosTabela() {
  return (
    <div className="bg-primaria-900 dark:bg-dark-primaria-900 rounded-2xl w-[345px] md:w-[736px] lg:w-[903px] xl:w-[1270px] flex flex-col my-10 overflow-x-auto" style={{ maxHeight: '700px', overflowY: 'auto' }}>      
      <LucrosMenuMoreResponsive />
      <table className="table-auto min-w-full">
        <thead>
          <tr>
            <th colSpan="6" className="px-4 pl-4 py-2 text-sm font-semibold text-center dark:text-gray-200">Detalhes do pedido</th>
            <th colSpan="7" className="px-4 pl-4 py-2 text-sm font-semibold text-center dark:text-gray-200">Taxas</th>
            <th colSpan="5" className="px-4 pl-4 py-2 text-sm font-semibold text-center dark:text-gray-200"></th>
          </tr>
          <tr>
            <th className="pr-4 pl-6 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Data</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200 dark:bg-dark-primaria-900 lg:sticky" style={{ zIndex: 1, left: 0, backgroundColor: '#F6F6FB' }}>Pedido</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200 lg:sticky" style={{ zIndex: 1, left: 'calc(200px)', backgroundColor: '#F6F6FB' }}>Loja</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200 lg:sticky" style={{ zIndex: 1, left: 'calc(140px)', backgroundColor: '#F6F6FB' }}>Valor</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Receita</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Vendas</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Comissão</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Transação</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Frete do Comprador</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Serviço</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">ADS</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Frete</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Plataforma</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Desconto e Subsídio</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Reembolso do Comprador</th>
            <th className="pr-6 pl-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Margem de Lucro</th>
            <th className="pr-6 pl-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Status</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Lucro</th>
          </tr>
        </thead>
        <tbody>
          <LucrosRow />
        </tbody>
      </table>
    </div>
  );
};
