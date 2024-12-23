import { useState, useEffect } from 'react';
import axios from 'axios';
import { searchUserId } from '@/utils/searchUserId';
import SearchIcon from '@mui/icons-material/Search';

export default function ModalMapearAnuncio({ onClose, onIdProduct }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [products, setProducts] = useState([]);
  const userId = searchUserId();


  //  buscar produtos
  useEffect(() => {
    if (!userId) return;
    axios
      .get(`${process.env.BACKEND_URL}/api/mercadolivre/products`, {
        params: { userId } 
      })
      .then((response) => {
        const restructuredData = response.data.products.map((product) => {
          return {
            sku: product.product_sku,
            title: product.title,
            color: product.color,
          };
        });
        setProducts(restructuredData);
      })
      .catch((error) => {
        console.error(`Error: ${error}`);
      });
  }, [userId]);


  // selecionar todos os checkboxes
  const handleCheckboxChange = (event, item) => {
    if (event.target.checked) {
      setSelectedItems(prevItems => [...prevItems, item]);
    } else {
      setSelectedItems(prevItems => prevItems.filter(i => i !== item));
    }
  };



  const handleMapear = async () => {
    const idProduct = selectedItems;

    try { 
      const response = await axios.get(`${process.env.BACKEND_URL}/api/stock/mercadolivre/get`, { params: { idProduct } });

      const transformedData = {
        sku: response.data.sku.map(item => item),
        colorVariables: response.data.colorVariables.map(item => item),
        availableQuantities: response.data.availableQuantityVariables.map(item => item),
      };

      onIdProduct(transformedData);
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-bgModal fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {/* header */}
            <div className="modal-header flex justify-between items-center mb-4">
              <h1 className='text-base text-neutral-700 font-semibold'>Mapear SKU do Anúncio</h1>
              <button type="button" onClick={onClose} className="bg-transparent border-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600 hover:text-gray-800">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* body */}
            <div className='mt-[14px] flex flex-col md:justify-around'>

              <div className='flex flex-col gap-3 md:flex-row'>
                <div className="flex w-full">
                  <select className="bg-primaria-800 rounded-lg p-2 w-full text-sm opacity-80 font-normal" name="lojas" id="lojas">
                    <option className="text-sm opacity-80 font-normal" value="lojas">Lojas</option>
                    <option className="text-sm opacity-80 font-normal" value="mercadoLivre">Mercado Livre</option>
                    <option className="text-sm opacity-80 font-normal" value="magalu">Magalu</option>
                  </select>
                </div>

                <div className="bg-primaria-800 flex items-center rounded w-full relative">
                  <SearchIcon className='h-5 w-5 absolute left-[6px] top-1/2 transform -translate-y-1/2' />
                  <input className="bg-primaria-800 w-full rounded-lg overflow-hidden text-sm font-normal pl-8 pr-3 py-2" type="text" placeholder="Pesquise por SKU" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} />
                </div>
              </div>
              <div className='bg-primaria-800 rounded-2xl w-full h-[420px] flex flex-col mx-auto mt-5 lg:mx-0 overflow-x-auto'>
                <table className='table-auto min-w-full mt-4'>
                  <thead>
                    <tr>
                      <th className='pl-4'></th>
                      <th className="pl-6 pr-4 py-3 md:py-5">Produtos</th>
                      <th className="px-4 py-3 md:py-5">ID dos anúncios</th>
                      <th className="px-4 py-3 md:py-5">Valor da variante</th>
                      <th className="pr-6 pl-3 py-3 md:py-5">Nome da loja</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index}>
                        <td className='pl-4'>
                          <input type="checkbox" onChange={(e) => handleCheckboxChange(e, product.sku)} />
                        </td>
                        <td className="w-[240px] pl-6 pr-4 py-3 md:py-5 font-medium">{product.title}</td>
                        <td className="px-4 py-3 md:py-5">{product.sku}</td>
                        <td className="px-4 py-3 md:py-5">{product.color}</td>
                        <td className="pr-6 pl-3 py-3 md:py-5">Lojinha</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

          </div>

          {/* footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" onClick={handleMapear} className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Mapear
            </button>
            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-400 text-base font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
