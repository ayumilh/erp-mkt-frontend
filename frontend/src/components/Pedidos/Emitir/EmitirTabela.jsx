import { useState } from 'react';
import EmitirRow from './EmitirRow';
import ModalDetailsContent from '../Actions/ModalDetailsPedidos/ModalDetailsContent';
import { EmitirMenuMoreResponsive } from './EmitirMenuMoreResponsive';
import SuccessNotification from '../../Geral/Notifications/SuccessNotification';
import ErrorNotification from '../../Geral/Notifications/ErrorNotification';

export default function EmitirTabela() {
  const [shippingIdOrder, setShippingIdOrder] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [showCheckboxesAll, setShowCheckboxesAll] = useState(false);
  const [isModalTr, setIsModalTr] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusRequestEmitirPedido, setStatusRequestEmitirPedido] = useState(null);

  const closeModal = () => {
    setIsModalTr(false);
  }

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setIsModalTr(true);
  }
  
  const handleSelectAllChange = () => {
    setShowCheckboxesAll(!showCheckboxesAll);
  };

  return (
    <div className="bg-primaria-900 dark:bg-dark-primaria-900 rounded-2xl w-full flex flex-col mt-4 mb-10 overflow-x-auto">
      <EmitirMenuMoreResponsive
        shippingIdOrder={shippingIdOrder}
        showCheckboxes={showCheckboxes}
        setShowCheckboxes={setShowCheckboxes}
        setShowCheckboxesAll={setShowCheckboxesAll}
        showCheckboxesAll={showCheckboxesAll}
      />
      <div className='overflow-x-auto'>
        <table className="table-auto min-w-full">
          <thead className='sticky top-0 z-10 bg-primaria-900 dark:bg-dark-primaria-900'>
            <tr>
              <th className="px-3 py-3 md:py-4">
                <input
                  type="checkbox"
                  checked={showCheckboxesAll}
                  onChange={handleSelectAllChange}
                />
              </th>
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
            <EmitirRow
              setToggleShowCheckboxes={setShowCheckboxes}
              toggleShowCheckboxesAll={showCheckboxesAll}
              setShippingIdOrder={setShippingIdOrder}
              setOrder={handleOrderSelect}
            />
          </tbody>
        </table>
      </div>
      {isModalTr && <ModalDetailsContent onClose={closeModal} order={selectedOrder} />}
      {
        statusRequestEmitirPedido === true && <SuccessNotification message='Pedidos emitidos com sucesso!' />
      }
      {
        statusRequestEmitirPedido === false && <ErrorNotification message='Não foi possível emitir os pedidos!' />
      }
    </div>
  );
};
