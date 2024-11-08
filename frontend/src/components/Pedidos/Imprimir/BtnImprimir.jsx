import { useRef, useState, useEffect } from "react";
import { searchUserId } from '@/utils/searchUserId';
import axios from "axios";
import BtnActions from '@/components/Geral/Button/BtnActions';
import { useReactToPrint } from "react-to-print";
import SuccessNotification from '@/components/Geral/Notifications/SuccessNotification';
import ErrorNotification from '@/components/Geral/Notifications/ErrorNotification';
import { saveAs } from 'file-saver';
import printJS from 'print-js';

export const BtnImprimir = ({ shippingIdOrder }) => {
  const contentPrint = useRef();
  const [statusRequestSync, setStatusRequestSync] = useState(null);
  const [printContent, setPrintContent] = useState(null);
  const handlePrint = useReactToPrint({
    content: () => contentPrint.current,
  });

  const imprimirPedido = async () => {
    if (!shippingIdOrder || shippingIdOrder.length === 0) {
      return;
    }

    const userId = searchUserId();
    if (!userId) return;

    console.log(shippingIdOrder);

    try {
      const response = await axios.post('https://erp-mkt.vercel.app/api/mercadolivre/print', {
        shipping_id: shippingIdOrder,
        userId: userId
      }, {
        responseType: 'arraybuffer'
      });
      if (response.status === 200) {
        const pdfContent = response.data;
        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(blob);
    
        saveAs(blob, 'documento.pdf');  // Salvar o PDF
        printJS(pdfUrl);  
        setStatusRequestSync(true);
      } else {
        console.error('Erro ao imprimir pedido');
        setStatusRequestSync(false);
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  useEffect(() => {
    if (printContent) {
      handlePrint();
    }
  }, [printContent, handlePrint]);

  return (
    <div>
      <div className='left-12'>
        <BtnActions title="Imprimir" onClick={imprimirPedido} color="ativado" padding="xs" rounded="lg" text="xs" />
      </div>

      <div ref={contentPrint}></div>

      {statusRequestSync === true && <SuccessNotification message="Pedidos imprimidos com sucesso" />}
      {statusRequestSync === false && <ErrorNotification message="Erro ao imprimir produtos" />}
    </div>
  )
}