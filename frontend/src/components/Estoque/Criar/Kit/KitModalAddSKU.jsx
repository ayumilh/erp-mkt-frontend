import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

export default function ModalAddSKU({ onClose, onIdProduct }){
  const [isOpen, setIsOpen] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedSKUs, setSelectedSKUs] = useState([]);


  useEffect(() => {
    const fetchSKU = async () => {
      try {
        axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stock/products`)
        .then((response) => {
          const restructuredData = response.data.map((product) => ({
            sku: product.sku,
            nome_do_produto: product.nome_do_produto,
          }));
          setProducts(restructuredData);
        })
      } catch (error) {
        console.error(error);
      }
    };
    if (isOpen) {
      fetchSKU();
    }
  }, [isOpen])

  
  const handleCheckboxChange = (e, sku) => {
    if (e.target.checked) {
      setSelectedSKUs(prevSKUs => [...prevSKUs, sku]);
    } else {
      setSelectedSKUs(prevSKUs => prevSKUs.filter(s => s !== sku));
    }
  };


  const handleSave = async () => {
    try {
      const idProduct = selectedSKUs;`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stock/product/get`
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stock/product/get`, { params: { idProduct } });

      const restructuredData = response.data.map((product) => ({
        sku: product.sku, 
        custo_de_compra: product.custo_de_compra,
        quantidade: product.quantidade,
      }));
  
      await onIdProduct(restructuredData);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-bgModal fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-700 bg-opacity-70 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {/* header */}
            <div className="modal-header flex justify-between items-center mb-4">
              <h1 className='text-base text-neutral-700 font-semibold'>Adicionar SKU do Produto</h1>
              <button type="button" onClick={onClose} className="bg-transparent border-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600 hover:text-gray-800">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* body */}
            <div className='mt-[14px] flex flex-col md:justify-around'>

              {/* buscar */}
              <div className='flex flex-col gap-3 md:flex-row'>
                <div className="flex w-full">
                  <select className="bg-primaria-800 rounded-lg p-2 w-full text-sm opacity-80 font-normal" name="SKU" id="SKU">
                    <option className="text-sm opacity-80 font-normal" value="lojas">Nome do anúncio</option>
                    <option className="text-sm opacity-80 font-normal" value="magalu">SKU</option>
                  </select>
                </div>

                <div className="flex items-center bg-primaria-800 rounded-lg w-full relative">
                  <SearchIcon className='bg-primaria-800 h-5 w-5 absolute left-[6px] top-1/2 transform -translate-y-1/2'/>
                  <input className="bg-primaria-800 w-full rounded overflow-hidden text-sm font-normal pl-8 pr-3 py-2" type="text" placeholder="Pesquise por SKU" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} />
                </div>
              </div>

              {/* Tabela */}
              <div className='bg-primaria-800 rounded-2xl w-full h-[420px] flex flex-col mx-auto mt-5 lg:mx-0 overflow-x-auto'>
                <table className='table-auto min-w-full mt-4'>
                  <thead>
                    <tr>
                      <th className='pl-4'></th>
                      <th className='pl-6 pr-4 py-3 md:py-5 text-sm font-semibold text-center'>SKU</th>
                      <th className='pr-6 pl-3 py-2 md:py-5 text-sm font-semibold text-center'>Nome do Produto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item, index) => (
                      <tr key={index}>
                        <td className='pl-4'>
                          <input type="checkbox" onChange={(e) => handleCheckboxChange(e, item.sku)}/> 
                        </td>
                        <td className='pl-6 pr-4 py-2 md:py-5'>{item.sku}</td>
                        <td className='pr-6 pl-4 py-2 md:py-5 overflow-hidden' style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.nome_do_produto}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* footer */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleSave}>
              Salvar
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
