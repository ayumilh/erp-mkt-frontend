'use client'
import { useState, useEffect } from 'react';
import { fetchOrders } from '@/utils/fetchOrders';
import PedidosRow from "./PedidosRow";
import ModalDetailsContent from "./Actions/ModalDetailsPedidos/ModalDetailsContent";
import { PedidosMenuMoreResponsive } from './Actions/PedidosMenuMoreResponsive';

const PedidosTabela = () => {
  const [isModalTr, setIsModalTr] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [pedido, setPedido] = useState([]);

  const closeModal = () => {
    setIsModalTr(false);
  }

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setIsModalTr(true);
  }

  useEffect(() => {
    const getOrders = async () => {
      const ordersData = await fetchOrders();
      if (ordersData && Array.isArray(ordersData)) {
        setPedido(ordersData);
        setTotalPages(Math.ceil(ordersData.length / rowsPerPage));
      } else {
        setPedido([]);
        setTotalPages(1);
      }
    };
    getOrders();
  }, [rowsPerPage, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const paginatedPedido = pedido.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = Number(event.target.value);
    setRowsPerPage(newRowsPerPage);
    setTotalPages(Math.ceil(pedido.length / newRowsPerPage));
    handlePageChange(1);
  };

  return (
    <div className="bg-primaria-900 dark:bg-dark-primaria-900 rounded-2xl w-full flex flex-col mt-4 mb-10 overflow-x-auto">
      <PedidosMenuMoreResponsive
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />
      <div className='overflow-x-auto'>
        <table className="table-auto min-w-full">
          <thead className='sticky top-0 -z-0 bg-primaria-900 dark:bg-dark-primaria-900'>
            <tr>
              <th className="pl-4 lg:pl-6 pr-3 py-3 md:py-4 text-sm font-semibold text-start dark:text-gray-200">Produtos</th>
              <th className="px-3 py-3 md:py-4"></th>
              <th className="px-3 py-3 md:py-4 text-sm font-semibold dark:text-gray-200">Valor do pedido</th>
              <th className="px-3 py-3 md:py-4 text-sm font-semibold text-start dark:text-gray-200">Destinatário</th>
              <th className="px-3 py-3 md:py-4 text-sm font-semibold text-start dark:text-gray-200">Tempo</th>
              <th className="px-3 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Metodos de envio</th>
              <th className="px-3 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Status</th>
              <th className="pl-3 pr-4 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Ações</th>
            </tr>
          </thead>
          <tbody>
            <PedidosRow setOrder={handleOrderSelect} pedido={paginatedPedido} />
          </tbody>
        </table>
      </div>
      {isModalTr && <ModalDetailsContent onClose={closeModal} order={selectedOrder} />}
    </div>
  );
};

export default PedidosTabela;