import SincronizarRow from "./SincronizarRow";
import { SincronizarMenuMoreResponsive } from './SincronizarMenuMoreResponsive';

const Sincronizartabela = () => {
  return (
    <div className="bg-primaria-900 dark:bg-dark-primaria-900 rounded-2xl w-[373px] md:w-[720px] lg:w-[876px] xl:w-[1264px] flex flex-col mx-auto lg:mx-0 mb-10 overflow-x-auto">
      <SincronizarMenuMoreResponsive />
      <table className="table-auto min-w-full">
      <thead className='sticky top-0 bg-primaria-900 dark:bg-dark-primaria-900'>
          <tr>
            <th className="px-4 py-2 md:py-4 text-sm font-semibold dark:text-gray-200">SKU</th>
            <th className="px-4 py-2 md:py-4 text-sm font-semibold dark:text-gray-200">Categorias</th>
            <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Nome</th>
            <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Custo de compra</th>
            <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Pacote</th>
            <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Criado/Atualizado</th>
            <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center dark:text-gray-200"></th>
          </tr>
        </thead>
        <tbody>
          <SincronizarRow />
        </tbody>
      </table>
    </div>
  );
};

export default Sincronizartabela;