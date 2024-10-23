import { useRef } from "react";
import { searchUserId } from '@/utils/searchUserId';
import axios from "axios";
import { useReactToPrint } from "react-to-print";

export const BtnImprimir = ({ shippingIdOrder }) => {
  const contentPrint = useRef();

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
        params: { userId }
      });
      if (response.status === 200) {
        handlePrint();
      } else {
        console.error('Erro ao imprimir pedido');
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={imprimirPedido}
        className='w-full rounded-lg px-2 py-1 bg-segundaria-900'
        >
          <span className='overflow-hidden text-sm md:text-base text-white' style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Imprimir</span>
      </button>

      <div ref={contentPrint}></div>
    </div>
  )
}