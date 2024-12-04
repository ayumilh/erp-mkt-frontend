import { useState } from "react";
import axios from "axios";
import SuccessNotification from '@/components/Geral/Notifications/SuccessNotification';
import ErrorNotification from '@/components/Geral/Notifications/ErrorNotification';
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.addVirtualFileSystem(pdfFonts);
import { searchUserId } from "@/utils/searchUserId";
import ConfigModal from "@/components/Config/Imprimir/ConfigModal";
import BtnDropdown from "./BtnDropdown";
import ErrorEmpty from "@/components/Geral/Notifications/ErrorEmpty";

export const BtnImprimirTeste = ({ shippingIdOrder }) => {
  const [statusRequestSync, setStatusRequestSync] = useState(null);
  const [shippingIdEmpty, setShippingIdEmpty] = useState(false);
  const [isModalConfigOpen, setIsModalConfigOpen] = useState(false);

  function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  function gerarPDF(arrayBuffer) {
    const base64Image = arrayBufferToBase64(arrayBuffer);
    console.log("Base64:", base64Image);
    const docDefinition = {
      content: [
        {
          image: 'data:image/png,/' + base64Image,
          width: 500,
          margin: [0, 20, 0, 0]

        }
      ],
    };
    console.log("DocDefinition:", docDefinition);
    
    pdfMake.createPdf(docDefinition).open();
  }

  const createTableInPdf = async (data, imageBuffer) => {
    if (!imageBuffer) {
      console.error("No image data received for PDF");
      return;
    }

    try {
      const imageBase64 = await arrayBufferToBase64(imageBuffer, 'jpeg');
      console.log("ImageBuffer:", imageBase64);

      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      const docDefinition = {
        content: [
          {
            text: formattedDate,
            alignment: 'right',
            fontSize: 14,
            margin: [0, 0, 0, 10]
          },
          {
            text: 'DECLARAÇÃO DE CONTEÚDO',
            semibold: true,
            alignment: 'center',
            fontSize: 20,
            margin: [0, 0, 0, 10]
          },
          {
            table: {
              widths: ['*', '*'],
              body: [
                [
                  { text: 'REMETENTE', semibold: true, fontSize: 20, alignment: 'center', margin: [0, 0, 0, 0] },
                  { text: 'DESTINATÁRIO', semibold: true, alignment: 'center' }
                ],
                [
                  {
                    text: [
                      `NOME: ${data.senderName}\n`,
                      `CPF/CNPJ: ${data.senderCpfCnpj}\n`,
                      `CEP: ${data.senderCep}\n`
                    ],
                    margin: [0, 0, 0, 0]
                  },
                  {
                    text: [
                      `NOME: ${data.recipientName}\n`,
                      `CPF/CNPJ: ${data.recipientCpfCnpj}\n`,
                      `CEP: ${data.recipientCep}\n`
                    ],
                    margin: [0, 0, 0, 0]
                  }
                ]
              ]
            },
            layout: {
              hLineWidth: function () { return 2; },
              vLineWidth: function () { return 2; }
            }
          },
          {
            text: '',
            margin: [0, 10, 0, 0]
          },
          {
            table: {
              headerRows: 2,
              widths: ['8%', '22%', '45%', '15%', '10%'],
              body: [
                [
                  { text: 'IDENTIFICAÇÃO DOS BENS', style: 'subheader', colSpan: 5, alignment: 'center' },
                ],
                [
                  { text: 'N°', style: 'tableHeader', alignment: 'center' },
                  { text: 'SKU', style: 'tableHeader' },
                  { text: 'DESCRIÇÃO', style: 'tableHeader' },
                  { text: 'VARIAÇÃO', style: 'tableHeader' },
                  { text: 'QTD', style: 'tableHeader' }
                ],
                ...data.items.map((item, index) => [
                  { text: index + 1, style: 'tableBody', alignment: 'center' },
                  { text: item.sku || '', style: 'tableBody' },
                  { text: item.description || '', style: 'tableBody' },
                  { text: item.variation || '', style: 'tableBody' },
                  { text: item.quantity.toString(), style: 'tableBody', alignment: 'right' }
                ])
              ]
            },
            layout: {
              hLineWidth: function () { return 2; },
              vLineWidth: function () { return 2; },
              hLineColor: function () { return 'black'; },
              vLineColor: function () { return 'black'; },
              paddingLeft: function () { return 8; },
              paddingRight: function () { return 8; }
            },
          },
          // {
          //   image: imageBase64,
          //   width: 500,
          //   margin: [0, 20, 0, 0]
          // }
        ],
        styles: {
          header: {
            fontSize: 20,
            bold: true,
            margin: [0, 0, 0, 0]
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 0, 0, 0]
          },
          tableHeader: {
            fontSize: 12,
            semibold: true,
          },
          tableBody: {
            fontSize: 14
          }
        },
        defaultStyle: {
          fontSize: 16
        }
      };

      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.getBase64((buffer) => {
        pdfDocGenerator.open();
      });
    } catch (error) {
      console.error("Error creating PDF image:", error);
    }
  };

  const imprimirPedido = async () => {
    if (!shippingIdOrder || shippingIdOrder.length === 0) {
      setShippingIdEmpty(true);
      return;
    } else {
      setShippingIdEmpty(false);
    }

    const userId = searchUserId();
    if (!userId) return;

    try {
      const uniqueShippingIdOrder = [...new Set(shippingIdOrder)];
      const processedShippingIds = new Set();

      for (const id of uniqueShippingIdOrder) {
        let imageBase64 = null;

        try { 
          // buscando dados da etiqueta do mercado livre
          const response = await axios.post('https://erp-mkt.vercel.app/api/mercadolivre/print', {
            shipping_id: id,
            userId: userId,
          }, {
            responseType: 'arraybuffer'
          });
          if (response.status === 200) {
            console.log(response.data);
            imageBase64 = response.data;
          }
        } catch (error) {
          console.error(`Erro ao buscar dados do pedido ${id}:`, error);
          setStatusRequestSync(false);
          return
        }

        const responseProduct = await axios.get('https://erp-mkt.vercel.app/api/mercadolivre/orderid-ready', {
          params: {
            shippingIds: [id],
            userId: userId,
          },
        });

        const restructedData = responseProduct.data.orders.map(order => {
          return {
            senderName: order.senderName || '',
            senderCpfCnpj: order.senderCpfCnpj || '',
            senderCep: order.senderCep || '',
            recipientName: order.receiverName || '',
            recipientCpfCnpj: order.recipientCpfCnpj || '',
            recipientCep: order.zipCode || '',
            description: order.Description || '',
            sku: order.productSKU || '',
            variation: order.variation || '',
            quantity: order.quantity || 0,
            shipping_id: order.shipping_id || 0,
          };
        });

        // Agrupar dados por shipping_id
        const groupedData = restructedData.reduce((acc, order) => {
          if (!acc[order.shipping_id]) {
            acc[order.shipping_id] = [];
          }
          acc[order.shipping_id].push(order);
          return acc;
        }, {});

        // Criar uma tabela para cada grupo de shipping_id
        for (const shippingId in groupedData) {
          if (!processedShippingIds.has(shippingId)) {
            const orders = groupedData[shippingId];
            let tableData = {
              senderName: orders[0].senderName || '',
              senderCpfCnpj: orders[0].senderCpfCnpj || '',
              senderCep: orders[0].senderCep || '',
              recipientName: orders[0].recipientName || '',
              recipientCpfCnpj: orders[0].recipientCpfCnpj || '',
              recipientCep: orders[0].recipientCep || '',
              items: orders.map(order => ({
                sku: order.sku || '',
                description: order.description || '',
                variation: order.variation || '',
                quantity: order.quantity || 0,
              }))
            };

            // Adicionar a tabela ao documento
            createTableInPdf(tableData, imageBase64);
            // gerarPDF(imageBase64);
            processedShippingIds.add(shippingId); // Marcar o shipping_id como já processado
          }
        }
      }

      setStatusRequestSync(true);
    } catch (error) {
      console.error(`Error: ${error}`);
      setStatusRequestSync(false);
    }
  };

  return (
    <div>
      <div className='left-12'>
        <BtnDropdown onClickImprimir={imprimirPedido} setIsModalConfigOpen={setIsModalConfigOpen} />
      </div>

      <ConfigModal isOpen={isModalConfigOpen} setIsOpen={setIsModalConfigOpen} />

      {statusRequestSync === true && <SuccessNotification message="Pedidos imprimidos com sucesso" />}
      {statusRequestSync === false && <ErrorNotification message="Erro ao imprimir produtos" />}
      {shippingIdEmpty === true && <ErrorEmpty title='pedidos' onClose={() => setShippingIdEmpty(false)} />}
    </div>
  )
}