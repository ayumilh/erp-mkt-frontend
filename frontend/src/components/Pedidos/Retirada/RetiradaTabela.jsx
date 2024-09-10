import { useState, useEffect } from 'react';
import ModalDetailsContent from '../Actions/ModalDetailsPedidos/ModalDetailsContent';
import RetiradaRow from './RetiradaRow';
import { RetiradaMenuMoreResponsive } from './RetiradaMenuMoreResponsive';
import axios from 'axios';

export default function RetiradaTabela() {
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
      try {
        const response = await axios.get(`https://erp-mkt.vercel.app/api/mercadolivre/orders`);
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
    <div className="bg-primaria-900 rounded-2xl w-[345px] md:w-[728px] lg:w-[903px] xl:w-[1270px] flex flex-col my-10 overflow-x-auto">
      <RetiradaMenuMoreResponsive 
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />
      <div className='overflow-x-auto'>
        <table className="table-auto min-w-full">
          <thead className="sticky top-0 z-10 bg-primaria-900">
            <tr>
              <th className="pl-4 lg:pl-6 pr-3 py-3 md:py-4 text-sm font-semibold text-start">Produtos</th>
              <th className="px-3 py-3 md:py-4"></th>
              <th className="px-3 py-3 md:py-4 text-sm font-semibold">Valor do pedido</th>
              <th className="px-3 py-3 md:py-4 text-sm font-semibold text-start">Destinatário</th>
              <th className="px-3 py-3 md:py-4 text-sm font-semibold text-start">Tempo</th>
              <th className="px-3 py-3 md:py-4 text-sm font-semibold text-center">Metodos de envio</th>
              <th className="pl-3 pr-4 py-3 md:py-4 text-sm font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <RetiradaRow 
              toggleShowCheckboxes={showCheckboxes} 
              toggleShowCheckboxesAll={showCheckboxesAll} 
              setShippingIdOrder={setShippingIdOrder}
              setOrder={handleOrderSelect}
              pedido={paginatedPedido}
            />
          </tbody>
        </table>
      </div>
      {isModalTr && <ModalDetailsContent onClose={closeModal} order={selectedOrder}/>}
    </div>
  );
};
