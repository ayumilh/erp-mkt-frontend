import { useRef, useState, useEffect } from "react";
import { searchUserId } from '@/utils/searchUserId';
import axios from "axios";
import BtnActions from '@/components/Geral/Button/BtnActions';
import SuccessNotification from '@/components/Geral/Notifications/SuccessNotification';
import ErrorNotification from '@/components/Geral/Notifications/ErrorNotification';
import { PDFDocument } from 'pdf-lib';

export const BtnImprimir = ({ shippingIdOrder }) => {
  const [statusRequestSync, setStatusRequestSync] = useState(null);

  const imprimirPedido = async () => {
    if (!shippingIdOrder || shippingIdOrder.length === 0) {
      return;
    }

    const userId = searchUserId();
    if (!userId) return;

    console.log(shippingIdOrder);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const id of shippingIdOrder) {
        const response = await axios.post('https://erp-mkt.vercel.app/api/mercadolivre/print', {
          shipping_id: id,
          userId: userId
        }, {
          responseType: 'arraybuffer'
        });

        if (response.status === 200) {
          const pdfContent = response.data;
          const singlePdfDoc = await PDFDocument.load(pdfContent);
          const copiedPages = await pdfDoc.copyPages(singlePdfDoc, singlePdfDoc.getPageIndices());
          copiedPages.forEach((page) => {
            pdfDoc.addPage(page);
          });
        } else {
          console.error(`Erro ao imprimir pedido ${id}`);
          setStatusRequestSync(false);
          return;
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      // Abre o PDF em uma nova aba do navegador
      window.open(url, '_blank');
      setStatusRequestSync(true);
    } catch (error) {
      console.error(`Error: ${error}`);
      setStatusRequestSync(false);
    }
  }

  return (
    <div>
      <div className='left-12'>
        <BtnActions title="Imprimir" onClick={imprimirPedido} color="ativado" padding="xs" rounded="lg" text="xs" />
      </div>

      {statusRequestSync === true && <SuccessNotification message="Pedidos imprimidos com sucesso" />}
      {statusRequestSync === false && <ErrorNotification message="Erro ao imprimir produtos" />}
    </div>
  )
}