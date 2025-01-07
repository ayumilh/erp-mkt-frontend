import { useState, useEffect } from 'react';
import { searchUserId } from '@/utils/searchUserId';
import EnviarRow from './EnviarRow';
import axios from 'axios';
import ModalDetailsContent from '../Actions/ModalDetailsPedidos/ModalDetailsContent';
import { EnviarMenuMoreResponsive } from './EnviarMenuMoreResponsive';

export default function EnviarTabela({ searchTerm, searchColumn, filteredOrders }) {
  const [shippingIdOrder, setShippingIdOrder] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [showCheckboxesAll, setShowCheckboxesAll] = useState(false);
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
    const fetchOrders = async () => {
      const userId = searchUserId();
      if (!userId) return;

      try {
        const params = { userId };
        if (searchTerm && searchTerm.trim() !== '') {
          params.searchTerm = searchTerm.toLowerCase();
          params.searchColumn = searchColumn;
        }

        if (filteredOrders.precoMin) {
          params.precoMin = parseFloat(filteredOrders.precoMin);
        }
        if (filteredOrders.precoMax) {
          params.precoMax = parseFloat(filteredOrders.precoMax);
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mercadolivre/issue`, { params });

        if (response.data && Array.isArray(response.data.orders)) {
          setPedido(response.data.orders);
          setTotalPages(Math.ceil(response.data.orders.length / rowsPerPage));
        } else {
          setPedido([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error(`Error: ${error}`);
        setPedido([]);
        setTotalPages(1);
      }
    };

    fetchOrders();
  }, [rowsPerPage, currentPage, searchTerm, searchColumn, filteredOrders]);

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
      <EnviarMenuMoreResponsive
        showCheckboxes={showCheckboxes}
        showCheckboxesAll={showCheckboxesAll}
        setShowCheckboxes={setShowCheckboxes}
        setShowCheckboxesAll={setShowCheckboxesAll}
        shippingIdOrder={shippingIdOrder}
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />
      <div className='overflow-x-auto'>
        <table className="table-auto min-w-full">
          <thead className='sticky top-0 z-10 bg-primaria-900 dark:bg-dark-primaria-900'>
            <tr>
              {showCheckboxes ? <td className="pl-3"></td> : showCheckboxesAll ? <td className="pl-3"></td> : null}
              <th className="pl-4 lg:pl-6 pr-3 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Produtos</th>
              <th className="px-3 py-3 md:py-4"></th>
              <th className="px-3 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Valor do pedido</th>
              <th className="px-3 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Destinatario</th>
              <th className="px-3 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Criação</th>
              <th className="px-3 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Metodos de envio</th>
              <th className="px-3 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Status</th>
              <th className="pr-4 pl-3 py-3 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Ações</th>
            </tr>
          </thead>
          <tbody>
            <EnviarRow
              toggleShowCheckboxes={showCheckboxes}
              toggleShowCheckboxesAll={showCheckboxesAll}
              setShippingIdOrder={setShippingIdOrder}
              setOrder={handleOrderSelect}
              pedido={paginatedPedido}
            />
          </tbody>
        </table>
      </div>
      {isModalTr && <ModalDetailsContent onClose={closeModal} order={selectedOrder} />}
    </div>
  );
};
