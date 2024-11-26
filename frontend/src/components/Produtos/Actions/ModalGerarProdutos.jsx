import { useState, useEffect } from 'react';
import axios from 'axios';
import BtnActions from '@/components/Geral/Button/BtnActions';
import { searchUserId } from '@/utils/searchUserId';
import CloseIcon from '@mui/icons-material/Close';
import SuccessNotification from '@/components/Geral/Notifications/SuccessNotification';
import ErrorNotification from '@/components/Geral/Notifications/ErrorNotification';

export default function ModalGerarProdutos({ onClose, idProduct }) {
   const [isOpen, setIsOpen] = useState(true);
   const [product, setProduct] = useState([]);
   const [statusRequestGerarProduto, setStatusRequestGerarProduto] = useState('');

   const userId = searchUserId();

   // buscar os sku's selecionados
   useEffect(() => {
      const fetchProduct = async () => {
         if (!userId) return

         try {
            const response = await axios.get('https://erp-mkt.vercel.app/api/stock/mercadolivre/get', {
               params: {
                  idProduct,
                  userId
               }
            });
            const data = response.data;
            const restructuredData = data.sku.map((item, index) => {
               return {
                  availableQuantityVariables: data.availableQuantityVariables[index][`availableQuantity${index + 1}`],
                  color: data.colorVariables[index][`color${index + 1}`],
                  gtinVariables: data.gtinVariables[index][`gtin${index + 1}`],
                  priceVariables: data.priceVariables[index][`price${index + 1}`],
                  sku: data.sku[index][`sku${index + 1}`],
                  statusVariables: data.statusVariables[index][`status${index + 1}`],
                  titleVariables: data.titleVariables[index][`title${index + 1}`],
               };
            });
            setProduct(restructuredData);
         } catch (error) {
            console.error(`Error: ${error}`);
         }
      }
      fetchProduct();
   }, [idProduct, userId]);

   // enviar sku
   const handleGerarProduto = async () => {
      if (!userId) return

      const productsData = product.map((item) => {
         return {
            quantidade: item.availableQuantityVariables,
            Preco_de_Varejo: item.priceVariables,
            SkuMercado: item.sku,
            Status_da_Venda: item.statusVariables,
            Nome_do_Produto: item.titleVariables,
            Codigo_de_Barras: item.gtinVariables,
         };
      });

      try {
         await axios.post('https://erp-mkt.vercel.app/api/stock/mercadolivre/sync', {
            productsData,
            userId:  userId 
         });
         setStatusRequestGerarProduto(true);
      } catch (error) {
         console.error(`Error: ${error}`);
         setStatusRequestGerarProduto(false)
      }
   }


   const modalClose = () => {
      setIsOpen(false);
      onClose();
   }

   return (
      <div className="bg-black bg-opacity-70 fixed z-50 inset-0 flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
         <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white dark:bg-dark-bg rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
               <div className="bg-white dark:bg-dark-bg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  {/* header */}
                  <div className="modal-header flex justify-between items-center mb-4">
                     <h1 className='text-base text-neutral-700 dark:text-gray-200 font-semibold'>Gerar produtos</h1>
                     <button type="button" onClick={modalClose} className="bg-transparent border-0">
                        <CloseIcon className='text-neutral-700 hover:text-black dark:text-gray-200 dark:hover:text-white' />
                     </button>
                  </div>

                  {/* body */}
                  <div className='mt-[14px] flex flex-col md:justify-around'>
                     <form className="p-3 flex flex-col items-center">
                        <div className="bg-primaria-800 dark:bg-dark-primaria-900 rounded-2xl w-full h-[420px] flex flex-col mx-auto mt-5 lg:mx-0 overflow-x-auto">
                           <table className="table-auto min-w-full mt-4">
                              <thead>
                                 <tr>
                                    <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center dark:text-gray-200">SKU</th>
                                    <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Nome</th>
                                    <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Preço</th>
                                    <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Status</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {product.map((item, index) => (
                                    <tr key={index}>
                                       <td className="px-4 py-2 md:py-4 dark:text-gray-200">{item.sku}</td>
                                       <td className="break-words md:break-normal px-4 py-2 md:py-4">
                                          <p className="font-medium dark:text-gray-200">{item.titleVariables}</p>
                                       </td>
                                       <td className="px-4 py-2 md:py-4 text-center dark:text-gray-200">{item.priceVariables}</td>
                                       <td className="px-4 py-2 md:py-4 text-center dark:text-gray-200">{item.statusVariables}</td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </div>

                     </form>
                  </div>
               </div>

               {/* footer */}
               <div className="bg-gray-50 dark:bg-dark-bg px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <BtnActions title='Gerar Produtos' onClick={handleGerarProduto} color='ativado' />
               </div>
            </div>
            {statusRequestGerarProduto === true && <SuccessNotification message='Produtos gerados com sucesso!' />}
            {statusRequestGerarProduto === false && <ErrorNotification message='Não foi possível gerar os produtos' />}
         </div>
      </div>
   )
}
