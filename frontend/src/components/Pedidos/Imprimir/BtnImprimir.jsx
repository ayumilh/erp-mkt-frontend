import { useRef, useState } from "react";
import { searchUserId } from '@/utils/searchUserId';
import axios from "axios";
import BtnActions from '@/components/Geral/Button/BtnActions';
import { useReactToPrint } from "react-to-print";
import SuccessNotification from '@/components/Geral/Notifications/SuccessNotification';
import ErrorNotification from '@/components/Geral/Notifications/ErrorNotification';


export const BtnImprimir = ({ shippingIdOrder }) => {
  const contentPrint = useRef();
  const [statusRequestSync, setStatusRequestSync] = useState(null);

  const handlePrint = useReactToPrint({
    content: () => contentPrint.current,
  });

  const imprimirPedido = async () => {
    if (!shippingIdOrder || shippingIdOrder.length === 0) {
      return;
    }

    const userId = searchUserId();
    if (!userId) return;

    try {
      const response = await axios.post('https://erp-mkt.vercel.app/api/mercadolivre/print', {
        shipping_id: shippingIdOrder,
        userId: userId
      });
      if (response.status === 200) {
        handlePrint();
        setStatusRequestSync(true);
      } else {
        console.error('Erro ao imprimir pedido');
        setStatusRequestSync(false);
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  return (
    <div>
      {/* <button
        type="button"
        onClick={imprimirPedido}
        className='w-full rounded-lg px-2 py-1 bg-segundaria-900'
        >
          <span className='overflow-hidden text-sm md:text-base text-white' style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Imprimir</span>
      </button> */}

      <div className='left-12'>
        <BtnActions title="Imprimir" onClick={imprimirPedido} color="ativado" padding="xs" rounded="lg" />
      </div>

      <div ref={contentPrint}></div>

      {statusRequestSync === true && <SuccessNotification message="Pedidos imprimidos com sucesso" />}
      {statusRequestSync === false && <ErrorNotification message="Erro ao imprimir produtos" />}
    </div>
  )
}