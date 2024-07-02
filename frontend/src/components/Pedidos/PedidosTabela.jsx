'use client'
import { useState } from 'react';
import PedidoRow from "./PedidoRow";
import ModalDetalhes from "./Actions/ModalDetalhes";
import { PedidosMenuMoreResponsive } from './Actions/PedidosMenuMoreResponsive';

const PedidosTabela = () => {
  const [isModalTr, setIsModalTr] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const closeModal = () => {
    setIsModalTr(false);
  }

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setIsModalTr(true);
  }

  return (
    <div className="bg-primaria-900 rounded-2xl w-[345px] md:w-[728px] lg:w-[903px] xl:w-[1270px] flex flex-col my-10 overflow-x-auto">
      <PedidosMenuMoreResponsive />
      <table className="table-auto min-w-full">
        <thead>
          <tr>
            <th className="pr-4 pl-6 py-2 md:py-5 text-sm font-semibold"></th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold">Produtos</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold">Valor</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center">ID Comprador</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center">Criação</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center">Metodos de envio</th>
            <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center">Vendedor</th>
            <th className="pr-6 pl-4 py-4 md:py-5 text-sm font-semibold text-center">Status</th>
          </tr>
        </thead>
        <tbody>
        <PedidoRow setOrder={handleOrderSelect} />
        </tbody>
      </table>
      {isModalTr && <ModalDetalhes onClose={closeModal} order={selectedOrder}/>}
    </div>
  );
};
export default PedidosTabela;