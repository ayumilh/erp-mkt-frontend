'use client'
import { NfMenuMoreResponsive } from './Actions/NfMenuMoreResponsive';

const NfTabela = () => {
  return (
    <div className="bg-primaria-900 rounded-2xl w-[345px] md:w-[728px] lg:w-[903px] xl:w-[1270px] flex flex-col my-10 overflow-x-auto">
      <NfMenuMoreResponsive />
      <div className='overflow-x-auto'>
        <table className="table-auto min-w-full">
          <thead className='sticky top-0 z-10 bg-primaria-900'>
            <tr>
              <th className="pl-4 lg:pl-6 pr-3 py-3 md:py-4 text-sm font-semibold text-start">Produtos</th>
              <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center">Qtd</th>
              <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center">Preço</th>
              <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {/* <NfRow /> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default NfTabela;