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

export const BtnImprimir = ({ shippingIdOrder }) => {
  const [statusRequestSync, setStatusRequestSync] = useState(null);
  const [shippingIdEmpty, setShippingIdEmpty] = useState(false);
  const [isModalConfigOpen, setIsModalConfigOpen] = useState(false);

  async function arrayBufferToBase64(buffer, imageType) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64String = window.btoa(binary);
    return `data:image/${imageType};base64,${base64String}`;
  }

  const createTableInPdf = async (data, imageBuffer) => {
    if (!imageBuffer) {
      console.error("No image data received for PDF");
      return; // Or handle the missing image gracefully (e.g., create a PDF without the image)
    }

    try {
      const imageBase64 = await arrayBufferToBase64(imageBuffer, 'png');
      const docDefinition = {
        content: [
          {
            table: {
              widths: ['*'],
              body: [
                [
                  {
                    text: 'DECLARAÇÃO DE CONTEÚDO',
                    style: 'subheader',
                    alignment: 'center',
                    width: '100%',
                    fontSize: 16,
                    margin: [0, 0, 0, 0],
                    border: [true, true, true, true]
                  }
                ]
              ]
            },
            layout: {
              hLineWidth: function () { return 1; },
              vLineWidth: function () { return 1; }
            }
          },
          {
            table: {
              widths: ['50%', '50%'],
              body: [
                [
                  { text: 'REMETENTE', style: 'subheader', alignment: 'center', border: [true, true, true, true], margin: [0, 0, 0, 0] },
                  { text: 'DESTINATÁRIO', style: 'subheader', alignment: 'center', border: [true, true, true, true] }
                ],
                [
                  {
                    text: [
                      `NOME: ${data.senderName}\n`,
                      `CPF/CNPJ: ${data.senderCpfCnpj}\n`,
                      `CEP: ${data.senderCep}\n`
                    ],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0]
                  },
                  {
                    text: [
                      `NOME: ${data.recipientName}\n`,
                      `CPF/CNPJ: ${data.recipientCpfCnpj}\n`,
                      `CEP: ${data.recipientCep}\n`
                    ],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0]
                  }
                ]
              ]
            },
            layout: {
              hLineWidth: function () { return 1; },
              vLineWidth: function () { return 1; }
            }
          },
          {
            text: '', // Texto vazio para adicionar espaço
            margin: [0, 20, 0, 0] // Margem para criar o espaço
          },
          {
            table: {
              headerRows: 2,
              widths: ['auto', '*', '*', '*', 'auto'],
              body: [
                [
                  { text: 'IDENTIFICAÇÃO DOS BENS', style: 'subheader', colSpan: 5, alignment: 'center', border: [true, true, true, true], margin: [0, 0, 0, 0], },
                ],
                ['N°', 'SKU', 'Descrição', 'Variação', 'QTD'],
                ...data.items.map((item, index) => [
                  index + 1,
                  item.sku || '',
                  item.description || '',
                  item.variation || '',
                  item.quantity.toString()
                ]),
              ]
            },
            layout: {
              hLineWidth: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 2 : 1;
              },
              vLineWidth: function (i) {
                return 1;
              },
              hLineColor: function (i) {
                return i === 1 ? 'black' : '#aaa';
              },
              paddingLeft: function (i) {
                return i === 0 ? 0 : 8;
              },
              paddingRight: function (i, node) {
                return (i === node.table.widths.length - 1) ? 0 : 8;
              }
            }
          }
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
          }
        },
        defaultStyle: {
          fontSize: 12
        }
      };

      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.getBase64((buffer) => {
        console.log("PDF buffer:", buffer);
        pdfDocGenerator.open();
      });
    } catch (error) {
      console.error("Error creating PDF image:", error);
      // Handle the error appropriately (e.g., display an error notification)
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
          const response = await axios.post('https://erp-mkt.vercel.app/api/mercadolivre/print', {
            shipping_id: id,
            userId: userId,
          }, {
            responseType: 'arraybuffer'
          });

          if (response.status === 200) {
            imageBase64 = response.data;
          }
        } catch (error) {
          console.error(`Error fetching data for order ${id}:`, error);
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