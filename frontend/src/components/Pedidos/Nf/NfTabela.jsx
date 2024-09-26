import { NfMenuMoreResponsive } from './Actions/NfMenuMoreResponsive';
import NfRow from './NfRow';

const NfTabela = () => {
    return (
        <div className="bg-primaria-900 dark:bg-dark-primaria-900 rounded-2xl w-[345px] md:w-[728px] lg:w-[903px] xl:w-[1270px] flex flex-col my-10 overflow-x-auto">
            <NfMenuMoreResponsive />
            <div className='overflow-x-auto'>
                <table className="table-auto min-w-full">
                    <thead className='sticky top-0 bg-primaria-900 dark:bg-dark-primaria-900'>
                        <tr>
                            <th className="pl-4 lg:pl-6 pr-3 py-3 md:py-4 text-sm font-semibold text-start dark:text-gray-200">N° da NF-e</th>
                            <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Chave</th>
                            <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Tipo</th>
                            <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Cliente</th>
                            <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Valor da NF</th>
                            <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">N° de Pedido</th>
                            <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Tempo</th>
                            <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <NfRow />
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default NfTabela;