'use client'
import { NfMenuMoreResponsive } from '../Actions/NfMenuMoreResponsive';
import NfConfigRow from './NfConfigRow';

const NfConfigTabela = () => {
  return (
    <div className="bg-primaria-900 rounded-2xl w-[345px] md:w-[728px] lg:w-[903px] xl:w-[1270px] flex flex-col my-10 overflow-x-auto">
      <NfMenuMoreResponsive />
      <div className='overflow-x-auto'>
        <table className="table-auto min-w-full">
          <thead className='sticky top-0 z-10 bg-primaria-900'>
            <tr>
              <th className="pl-4 lg:pl-6 pr-3 py-3 md:py-4 text-sm font-semibold text-start">Conta da Nota Fiscal</th>
              <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center">CNPJ</th>
              <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center">Loja Associada</th>
              <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center">Certificado A1</th>
              <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center">Classe de Imposto Padrão</th>
              <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <NfConfigRow />
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default NfConfigTabela;