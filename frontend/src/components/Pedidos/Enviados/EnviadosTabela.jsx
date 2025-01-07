import { useState, useEffect } from 'react';
import axios from 'axios';
import { searchUserId } from '@/utils/searchUserId';
import ModalDetailsContent from '../Actions/ModalDetailsPedidos/ModalDetailsContent';
import EnviadosRow from './EnviadosRow';
import { EnviadosMenuMoreResponsive } from './EnviadosMenuMoreResponsive';

export default function EnviadosTabela({ searchTerm, searchColumn, filteredOrders }) {
  const [shippingIdOrder, setShippingIdOrder] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [showCheckboxesAll, setShowCheckboxesAll] = useState(false);
  const [isModalTr, setIsModalTr] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [pedido, setPedido] = useState([]);

  const userId = searchUserId();

  const closeModal = () => {
    setIsModalTr(false);
  }

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setIsModalTr(true);
  }

  function translateStatus(status, substatus) {
    if (status === 'ready_to_ship' && (substatus === 'picked_up' || substatus === 'in_hub')) {
      return 'Enviado';
    } else if (status === 'delivered') {
      return 'Entregue';
    }
    return status;
  }

  useEffect(() => {
    const getOrders = async () => {
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

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mercadolivre/delivered`, { params });
        if (response.data && Array.isArray(response.data.orders)) {
          const filteredOrders = response.data.orders.filter(order =>
            order.status === 'delivered' || (order.status === 'ready_to_ship' && (order.substatus === 'picked_up' || order.substatus === 'in_hub'))
          );
          const ordersWithTranslatedStatus = filteredOrders.map(order => ({
            ...order,
            translatedStatus: translateStatus(order.status, order.substatus)
          }));
          setPedido(ordersWithTranslatedStatus);
          setTotalPages(Math.ceil(ordersWithTranslatedStatus.length / rowsPerPage));
        }
        // testar um else ou deixar so o catch (ver se o retorno é um array vazio)
      } catch (error) {
        console.error('Erro ao buscar os pedidos:', error);
        setPedido([]);
        setTotalPages(1);
      }
    };
    getOrders();
  }, [rowsPerPage, currentPage, userId, searchTerm, searchColumn, filteredOrders]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage, userId]);

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

  const handleSelectAllChange = () => {
    setShowCheckboxesAll(!showCheckboxesAll);
  };

  return (
    <div className="bg-primaria-900 dark:bg-dark-primaria-900 rounded-2xl w-full flex flex-col mt-4 mb-10 overflow-x-auto">
      <EnviadosMenuMoreResponsive
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        showCheckboxes={showCheckboxes}
        setShowCheckboxes={setShowCheckboxes}
        showCheckboxesAll={showCheckboxesAll}
        setShowCheckboxesAll={setShowCheckboxesAll}
        shippingIdOrder={shippingIdOrder}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />
      <div className='overflow-x-auto'>
        <table className="table-auto min-w-full">
          <thead className="sticky top-0 z-10 bg-primaria-900 dark:bg-dark-primaria-900">
            <tr>
              <td className="pl-4">
                <input
                  type="checkbox"
                  checked={showCheckboxesAll}
                  onChange={handleSelectAllChange}
                />
              </td>
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
            <EnviadosRow
              setToggleShowCheckboxes={setShowCheckboxes}
              toggleShowCheckboxesAll={showCheckboxesAll}
              setShippingIdOrder={setShippingIdOrder}
              setOrder={handleOrderSelect}
              paginatedPedido={paginatedPedido}
              translateStatus={translateStatus}
            />
          </tbody>
        </table>
      </div>
      {isModalTr && <ModalDetailsContent onClose={closeModal} order={selectedOrder} />}
    </div>
  );
};
