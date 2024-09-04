import { NfMenuMoreResponsive } from './Actions/NfMenuMoreResponsive';
import NfRow from './NfRow';

const NfTabela = () => {
    return (
        <div className="bg-primaria-900 rounded-2xl w-[345px] md:w-[728px] lg:w-[903px] xl:w-[1270px] flex flex-col my-10 overflow-x-auto">
            <NfMenuMoreResponsive />
            <div className='overflow-x-auto'>
                <table className="table-auto min-w-full">
                    <thead className='sticky top-0 z-10 bg-primaria-900'>
                        <tr>
                            <th className="pl-4 lg:pl-6 pr-3 py-3 md:py-4 text-sm font-semibold text-start">N° da NF-e</th>
                            <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center">Chave</th>
                            <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center">Tipo</th>
                            <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center">Cliente</th>
                            <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center">Valor da NF</th>
                            <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center">N° de Pedido</th>
                            <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center">Tempo</th>
                            <th className="pr-3 py-3 md:py-4 text-sm font-semibold text-center">Status</th>
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