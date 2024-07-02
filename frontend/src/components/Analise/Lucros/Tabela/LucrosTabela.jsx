import LucrosRow from './LucrosRow';
import { LucrosMenuMoreResponsive } from '../LucrosMenuMoreResponsive';

export default function LucrosTabela() {
  return (
    <div className="bg-primaria-900 rounded-2xl w-[345px] md:w-[736px] lg:w-[903px] xl:w-[1270px] flex flex-col my-10 overflow-x-auto" style={{ maxHeight: '700px', overflowY: 'auto' }}>      
      <LucrosMenuMoreResponsive />
      <table className="table-auto min-w-full">
        <thead>
          <tr>
            <th colSpan="6" className="px-4 pl-4 py-2 text-sm font-semibold text-center">Detalhes do pedido</th>
            <th colSpan="7" className="px-4 pl-4 py-2 text-sm font-semibold text-center">Taxas</th>
            <th colSpan="5" className="px-4 pl-4 py-2 text-sm font-semibold text-center"></th>
          </tr>
          <tr>
            <th className="pr-4 pl-6 py-2 md:py-5 text-sm font-semibold text-center">Data</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center lg:sticky" style={{ zIndex: 1, left: 0, backgroundColor: '#F6F6FB' }}>Pedido</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center lg:sticky" style={{ zIndex: 1, left: 'calc(200px)', backgroundColor: '#F6F6FB' }}>Loja</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center lg:sticky" style={{ zIndex: 1, left: 'calc(140px)', backgroundColor: '#F6F6FB' }}>Valor</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center">Receita</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center">Vendas</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center">Comissão</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center">Transação</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center">Frete do Comprador</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center">Serviço</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center">ADS</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center">Frete</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center">Plataforma</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center">Desconto e Subsídio</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center">Reembolso do Comprador</th>
            <th className="pr-6 pl-4 py-2 md:py-5 text-sm font-semibold text-center">Margem de Lucro</th>
            <th className="pr-6 pl-4 py-2 md:py-5 text-sm font-semibold text-center">Status</th>
            <th className="px-4 pl-4 py-2 md:py-5 text-sm font-semibold text-center">Lucro</th>
          </tr>
        </thead>
        <tbody>
          <LucrosRow />
        </tbody>
      </table>
    </div>
  );
};
