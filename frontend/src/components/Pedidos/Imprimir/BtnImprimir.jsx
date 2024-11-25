import { useState } from "react";
import { searchUserId } from '@/utils/searchUserId';
import axios from "axios";
import SuccessNotification from '@/components/Geral/Notifications/SuccessNotification';
import ErrorNotification from '@/components/Geral/Notifications/ErrorNotification';
import { PDFDocument, rgb } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import BtnDropdown from "./BtnDropdown";
import ErrorImprimirEmpty from "@/components/Geral/Notifications/ErrorImprimirEmpty";


pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

export const BtnImprimir = ({ shippingIdOrder }) => {
  const [statusRequestSync, setStatusRequestSync] = useState(null);
  const [shippingIdEmpty, setShippingIdEmpty] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const breakWords = (text, maxWidth, fontSize) => {
    const words = text.split(' ');
    let lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = calculateTextWidth(currentLine + ' ' + word, fontSize);
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);

    // Verificar se a linha é maior que o maxWidth e quebrar se necessário
    lines = lines.flatMap(line => {
      let brokenLines = [];
      while (calculateTextWidth(line, fontSize) > maxWidth) {
        let breakIndex = line.length;
        while (calculateTextWidth(line.substring(0, breakIndex), fontSize) > maxWidth) {
          breakIndex--;
        }
        brokenLines.push(line.substring(0, breakIndex));
        line = line.substring(breakIndex);
      }
      brokenLines.push(line);
      return brokenLines;
    });

    return lines;
  };

  const calculateTextWidth = (text, fontSize) => {
    return text.length * fontSize * 0.6;
  };

  const calculateMaxCellHeight = (rowData, colWidths, fontSize, cellPadding) => {
    // Calculate max height for each cell in the current row
    return rowData.map((cellText, cellIndex) => {
      const lines = breakWords(cellText.toString(), colWidths[cellIndex] - 4 * cellPadding, fontSize);
      return (fontSize + cellPadding * 2) * lines.length;
    }).reduce((maxHeight, currentHeight) => Math.max(maxHeight, currentHeight), 0);
  };

  const createTableInPdf = async (pdfDoc, data, pageSize) => {
    const page = pdfDoc.addPage(pageSize);
    const { width, height } = page.getSize();
    const fontSize = 12;
    const margin = 50;
    const cellPadding = 3;
    const cellHeight = fontSize + cellPadding * 2;
    const cellWidth = (width - 2 * margin) / 6; // Ajustar a largura das células com base no tamanho da página
    const tableWidth = cellWidth * 6; // Largura total da tabela com a coluna de numeração

    // Função para estimar a largura do texto
    const estimateTextWidth = (text, fontSize) => {
      return text.length * (fontSize * 0.6); // Estimativa simples
    };

    const centerText = (text, x, y, fontSize, cellWidth) => {
      const textWidth = estimateTextWidth(text, fontSize);
      const centeredX = x + (cellWidth - textWidth) / 2;
      page.drawText(text, { x: centeredX, y, size: fontSize, color: rgb(0, 0, 0) });
    };

    // Adicionar título no topo da página
    const title = "DECLARAÇÃO DE CONTEÚDO";
    const titleFontSize = 20;
    const titleWidth = estimateTextWidth(title, titleFontSize);
    const titleX = (width - titleWidth) / 2;
    const titleY = height - margin;
    page.drawText(title, { x: titleX, y: titleY, size: titleFontSize, color: rgb(0, 0, 0) });

    // Adicionar distância entre o título e o conteúdo abaixo
    const contentTop = titleY - 2 * fontSize - 20;

    // Remetente e Destinatário
    const senderTop = contentTop;

    // Desenhar cabeçalhos da tabela
    page.drawRectangle({
      x: margin,
      y: senderTop,
      width: tableWidth / 2,
      height: cellHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });
    centerText(`REMETENTE`, margin, senderTop + cellPadding, fontSize, tableWidth / 2);

    page.drawRectangle({
      x: margin + tableWidth / 2,
      y: senderTop,
      width: tableWidth / 2,
      height: cellHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });
    centerText(`DESTINATÁRIO`, margin + tableWidth / 2, senderTop + cellPadding, fontSize, tableWidth / 2);

    // Desenhar dados do remetente
    const senderData = [
      `NOME: ${data.senderName}`,
      `CPF/CNPJ: ${data.senderCpfCnpj}`,
      `CEP: ${data.senderCep}`
    ].map((text) => breakWords(text, tableWidth / 2 - 2 * cellPadding, fontSize));

    let currentY = senderTop - cellHeight;
    let senderHeight = 0;
    senderData.forEach((lines, index) => {
      lines.forEach((line, lineIndex) => {
        page.drawText(line, { x: margin + cellPadding, y: currentY - lineIndex * (fontSize + cellPadding), size: fontSize, color: rgb(0, 0, 0) });
      });
      currentY -= lines.length * (fontSize + cellPadding);
      senderHeight += lines.length * (fontSize + cellPadding);
    });

    // Desenhar dados do destinatário
    const recipientData = [
      `NOME: ${data.recipientName}`,
      `CPF/CNPJ: ${data.recipientCpfCnpj}`,
      `CEP: ${data.recipientCep}`
    ].map((text) => breakWords(text, tableWidth / 2 - 2 * cellPadding, fontSize));

    currentY = senderTop - cellHeight;
    let recipientHeight = 0;
    recipientData.forEach((lines, index) => {
      lines.forEach((line, lineIndex) => {
        page.drawText(line, { x: margin + tableWidth / 2 + cellPadding, y: currentY - lineIndex * (fontSize + cellPadding), size: fontSize, color: rgb(0, 0, 0) });
      });
      currentY -= lines.length * (fontSize + cellPadding);
      recipientHeight += lines.length * (fontSize + cellPadding);
    });

    // Calcular a altura máxima necessária para as seções de remetente e destinatário
    const maxSenderHeight = calculateMaxCellHeight(senderData, Array(senderData.length).fill(tableWidth / 2), fontSize, cellPadding);
    const maxRecipientHeight = calculateMaxCellHeight(recipientData, Array(recipientData.length).fill(tableWidth / 2), fontSize, cellPadding);

    // Definir uma altura mínima para as células
    const minHeight = cellHeight * 2; // Ajuste este valor conforme necessário

    // Ajustar bordas com base nas alturas máximas e na altura mínima
    let maxHeight = Math.max(maxSenderHeight, maxRecipientHeight, minHeight);

    // Adicionar altura extra apenas se houver quebra de linha
    if (maxHeight > cellHeight) {
      maxHeight += 45;
    }


    page.drawRectangle({
      x: margin,
      y: senderTop - maxHeight,
      width: tableWidth / 2,
      height: maxHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });
    page.drawRectangle({
      x: margin + tableWidth / 2,
      y: senderTop - maxHeight,
      width: tableWidth / 2,
      height: maxHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });

    // Identificação dos Bens
    const tableTop = senderTop - maxHeight - 35;

    // Desenhar cabeçalho da tabela "IDENTIFICAÇÃO DOS BENS"
    page.drawRectangle({
      x: margin,
      y: tableTop,
      width: tableWidth,
      height: cellHeight,
      borderColor: rgb(0, 0, 0),
      borderWidth: 1,
    });
    centerText(`IDENTIFICAÇÃO DOS BENS`, margin, tableTop + cellPadding, fontSize, tableWidth);

    // Desenhar cabeçalhos das colunas
    const colWidths = [30, 110, 220, 100, 40];
    const headers = ["N°", "SKU", "Descrição", "Variação", "QTD"];

    // Verificar se a largura total das colunas ultrapassa a largura da página
    const pageWidth = 595.28; // Largura da página A4 em pontos (8.27 pol * 72 pontos/pol)
    const totalTableWidth = colWidths.reduce((a, b) => a + b, 0);
    if (totalTableWidth > pageWidth - 2 * margin) {
      // Ajustar largura das colunas proporcionalmente para caber na página
      const scaleFactor = (pageWidth - 2 * margin) / totalTableWidth;
      colWidths.forEach((width, index) => {
        colWidths[index] = width * scaleFactor;
      });
    }

    headers.forEach((header, i) => {
      page.drawRectangle({
        x: margin + colWidths.slice(0, i).reduce((a, b) => a + b, 0),
        y: tableTop - cellHeight,
        width: colWidths[i],
        height: cellHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
      });
      centerText(header, margin + colWidths.slice(0, i).reduce((a, b) => a + b, 0), tableTop - cellHeight + cellPadding, fontSize, colWidths[i]);
    });
    
    // Desenhar dados da tabela
    let yStart = tableTop - 2 * cellHeight;   
    data.items.forEach((item, index) => {
      const row = [index + 1, item.sku || '', item.description || '', item.variation || '', item.quantity.toString()];
      
      // Calcular a altura máxima necessária para a linha
      const maxCellHeight = Math.max(...row.map((cell, cellIndex) => {
        const cellText = cell ? cell.toString() : '';
        const lines = breakWords(cellText, colWidths[cellIndex] - 2 * cellPadding, fontSize);
        return (fontSize + cellPadding * 2) * lines.length;
      })) * 1.1;
    
      row.forEach((cell, cellIndex) => {
        const y = yStart - index * maxCellHeight;
        const cellText = cell ? cell.toString() : '';
        const lines = breakWords(cellText, colWidths[cellIndex] - 2 * cellPadding, fontSize);
        page.drawRectangle({
          x: margin + colWidths.slice(0, cellIndex).reduce((a, b) => a + b, 0),
          y: y - maxCellHeight + cellHeight,
          width: colWidths[cellIndex],
          height: maxCellHeight,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1,
        });
        lines.forEach((line, lineIndex) => {
          page.drawText(line, { x: margin + colWidths.slice(0, cellIndex).reduce((a, b) => a + b, 0) + cellPadding, y: y - lineIndex * fontSize - cellPadding, size: fontSize, color: rgb(0, 0, 0) });
        });
      });
    });

    // const rightAlignText = (text, x, y, fontSize, cellWidth) => {
    //   const textWidth = estimateTextWidth(text, fontSize);
    //   const rightAlignedX = x + cellWidth - textWidth;
    //   page.drawText(text, { x: rightAlignedX, y, size: fontSize, color: rgb(0, 0, 0) });
    // };

    // Desenhar linha "Total" na parte inferior da tabela, alinhada com a coluna "QTD"
    // const totalY = yStart - totalHeight - cellHeight;
    // page.drawRectangle({
    //   x: margin,
    //   y: totalY,
    //   width: tableWidth,
    //   height: cellHeight,
    //   borderColor: rgb(0, 0, 0),
    //   borderWidth: 1,
    // });
    // rightAlignText(`Total: ${data.total}`, margin, totalY + cellPadding, fontSize, tableWidth);
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
      const pdfDoc = await PDFDocument.create();

      const uniqueShippingIdOrder = [...new Set(shippingIdOrder)];
      const processedShippingIds = new Set();

      for (const id of shippingIdOrder) {
        const response = await axios.post('https://erp-mkt.vercel.app/api/mercadolivre/print', {
          shipping_id: uniqueShippingIdOrder,
          userId: userId
        }, {
          responseType: 'arraybuffer'
        });

        if (response.status === 200) {
          const pdfContent = new Uint8Array(response.data);
          const singlePdfDoc = await PDFDocument.load(pdfContent);
          const copiedPages = await pdfDoc.copyPages(singlePdfDoc, [0]);

          let pageIndex = 0;

          for (const page of copiedPages) {
            const { width, height } = page.getSize();
            const pdfPage = pdfDoc.addPage();

            // Embutir a página original no novo documento
            const embeddedPage = await pdfDoc.embedPage(page);

            const scale = 1.9;

            const xOffset = (pdfPage.getWidth() - (width - 150) * scale * 0.4) / 2;
            const yOffset = (pdfPage.getHeight() - height * scale) / 1.1;

            // Desenhar a página original na posição centralizada
            pdfPage.drawPage(embeddedPage, {
              x: xOffset,
              y: yOffset,
              width: width * scale,
              height: height * scale,
            });

            pageIndex++;
          }

          // Usar pdfjsLib para extrair texto
          const loadingTask = pdfjsLib.getDocument({ data: pdfContent });
          const pdf = await loadingTask.promise;
          let pdfText = '';
          for (let i = 0; i < pdf.numPages; i++) {
            const page = await pdf.getPage(i + 1);
            const textContent = await page.getTextContent();
            const strings = textContent.items
              .filter(item => item && item.str) // Filtrar itens válidos
              .map(item => item.str);
            pdfText += strings.join(' ');
          }

          const responseProduct = await axios.get('https://erp-mkt.vercel.app/api/mercadolivre/orderid-ready', {
            params: {
              shippingIds: shippingIdOrder,
              userId: userId
            }
          });
          console.log(responseProduct.data.orders);

          const restructedData = responseProduct.data.orders.map(order => {
            return {
              senderName: order.senderName || '',
              recipientCep: order.zipCode || '',
              recipientName: order.receiverName || '',
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
          
              await createTableInPdf(pdfDoc, tableData);
              processedShippingIds.add(shippingId); // Marcar o shipping_id como já processado
            }
          }
        } else {
          console.error(`Erro ao imprimir pedido ${id}`);
          setStatusRequestSync(false);
          return;
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setStatusRequestSync(true);
      setTimeout(() => {
        window.open(url, '_blank');
      }, 1000)
    } catch (error) {
      console.error(`Error: ${error}`);
      setStatusRequestSync(false);
    }
  };

  return (
    <div>
      <div className='left-12'>
        <BtnDropdown onClickImprimir={imprimirPedido} />
      </div>

      {statusRequestSync === true && <SuccessNotification message="Pedidos imprimidos com sucesso" />}
      {statusRequestSync === false && <ErrorNotification message="Erro ao imprimir produtos" />}
      {shippingIdEmpty === true && <ErrorImprimirEmpty />}
    </div>
  )
}