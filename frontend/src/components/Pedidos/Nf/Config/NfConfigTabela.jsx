'use client'
import { NfMenuMoreResponsive } from '../Actions/NfMenuMoreResponsive';
import NfConfigRow from './NfConfigRow';

const NfConfigTabela = () => {
  return (
    <div className="bg-primaria-900 dark:bg-dark-primaria-900 rounded-2xl w-full flex flex-col mt-4 mb-10 overflow-x-auto">
      <NfMenuMoreResponsive />
      <div className='overflow-x-auto'>
        <table className="table-auto min-w-full">
          <thead className='sticky top-0 z-10 bg-primaria-900 dark:bg-dark-primaria-900'>
            <tr>
              <th className="pl-4 lg:pl-6 pr-3 py-3 md:py-4 text-sm font-semibold text-start dark:text-gray-200">Conta da Nota Fiscal</th>
              <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">CNPJ</th>
              <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Loja Associada</th>
              <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Certificado A1</th>
              <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Classe de Imposto Padrão</th>
              <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Status</th>
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