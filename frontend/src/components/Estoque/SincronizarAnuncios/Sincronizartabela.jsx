import SincronizarRow from "./SincronizarRow";
import { SincronizarMenuMoreResponsive } from './SincronizarMenuMoreResponsive';

const SincronizarTabela = () => {
  return (
    <div className="bg-primaria-900 rounded-2xl w-[373px] md:w-[720px] lg:w-[876px] xl:w-[1264px] flex flex-col mx-auto lg:mx-0 mb-10 overflow-x-auto">
      <SincronizarMenuMoreResponsive />
      <table className="table-auto min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 md:py-4 text-sm font-semibold">SKU</th>
            <th className="px-4 py-2 md:py-4 text-sm font-semibold">Categorias</th>
            <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center">Nome</th>
            <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center">Custo de compra</th>
            <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center">Pacote</th>
            <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center">Criado/Atualizado</th>
            <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center"></th>
          </tr>
        </thead>
        <tbody>
          <SincronizarRow />
        </tbody>
      </table>
    </div>
  );
};

export default SincronizarTabela;
