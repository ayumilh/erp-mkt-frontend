import { useState } from 'react';
import ImprimirRow from './ImprimirRow';
import ModalDetailsContent from '../Actions/ModalDetailsPedidos/ModalDetailsContent';
import { ImprimirMenuMoreResponsive } from './ImprimirMenuMoreResponsive';

export default function ImprimirTabela() {
  const [shippingIdOrder, setShippingIdOrder] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [showCheckboxesAll, setShowCheckboxesAll] = useState(false);
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
      <ImprimirMenuMoreResponsive />
      <div className='overflow-x-auto'>
      <table className="table-auto min-w-full">
          <thead className='sticky top-0 z-10 bg-primaria-900'>
            <tr>
              {showCheckboxes ? <td className="pl-3"></td> : showCheckboxesAll ? <td className="pl-3"></td> : null}
              <th className='pl-4'></th>
              <th className="pl-6 pr-4 py-2 md:py-5 text-sm font-semibold text-center">Produtos</th>
              <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center">Valor</th>
              <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center">Destinatario</th>
              <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center">Criação</th>
              <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center">Metodos de envio</th>
              <th className="px-4 py-2 md:py-5 text-sm font-semibold text-center">Vendedor</th>
              <th className="pr-6 pl-3 py-2 md:py-5 text-sm font-semibold text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <ImprimirRow 
              toggleShowCheckboxes={showCheckboxes} 
              toggleShowCheckboxesAll={showCheckboxesAll} 
              setShippingIdOrder={setShippingIdOrder}
              setOrder={handleOrderSelect}
            />
          </tbody>
        </table>
      </div>
      {isModalTr && <ModalDetailsContent onClose={closeModal} order={selectedOrder}/>}
    </div>
  );
};
