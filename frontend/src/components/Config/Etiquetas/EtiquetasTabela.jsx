'use client'
import EtiquetasRow from "./EtiquetasRow.jsx";

const EtiquetasTabela = () => {

  return (
    <div className="bg-primaria-900 dark:bg-dark-primaria-900 rounded-2xl w-full flex flex-col mb-10 overflow-x-auto">
      <table className="table-auto min-w-full">
        <thead className="sticky top-0 z-0 bg-primaria-900 dark:bg-dark-primaria-900">
          <tr>
            <th className="pr-4 pl-6 py-2 md:py-5 text-sm text-start font-semibold dark:text-gray-200">Métodos de Envio</th>
            <th className="px-4 py-2 md:py-5 text-sm text-start font-semibold dark:text-gray-200">Tipo de Etiqueta</th>
            <th className="px-4 py-2 md:py-5 text-sm text-end font-semibold dark:text-gray-200">Tamanho</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Opção de Entrega</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Horários de Envio</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Filtro de Envio</th>
            <th className="pr-6 pl-4 py-2 md:py-5 text-sm font-semibold text-center dark:text-gray-200">Ações</th>
          </tr>
        </thead>
       <tbody>
          <EtiquetasRow/>
        </tbody>
      </table>
    </div>
  );
};

export default EtiquetasTabela;