import { useState, useEffect } from 'react';
import { searchUserId } from '@/utils/searchUserId';
import axios from 'axios';
import BtnActive from '@/components/Geral/Button/BtnActive';
import SearchIcon from '@mui/icons-material/Search';
import BtnActionsFilter from '../Geral/Dropdown/BtnActionsFilter';

<<<<<<< HEAD
const ProdutosActionsFilter = ({ onFilterChange, setSearchTerm, searchTerm  }) => {
  
=======
const ProdutosActionsFilter = ({ onFilterChange }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const userid = searchUserId();
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    const params = { userid };
    if (searchTerm) {
      params.title = searchTerm.toLowerCase();
    }
    console.log(params);
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mercadolivre/products`, { params });
      setProducts(response.data.products);
      console.log(response.data.products);
    } catch (err) {
      setError('Erro ao recuperar os produtos. Por favor, tente novamente mais tarde.');
      console.error(err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [userid, searchTerm]);

  const filteredProducts = Array.isArray(products) ? products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

>>>>>>> 74018f7c156c6f89ceeb7ea11e3e4edceeabc5e7
  return (
    <div className="bg-primaria-900 dark:bg-dark-primaria-900 hover:shadow-input transition-all ease-in duration-500 rounded-2xl xl:flex w-full min-h-max px-4 py-5 xl:px-8 xl:items-center">
      <h2 className='text-sm lg:text-base text-neutral-700 dark:text-gray-200 font-semibold'>O que você procura?</h2>

      <form className="mt-[14px] md:flex md:justify-around xl:ml-5">

        <div className="flex items-center rounded w-full md:w-[300px] lg:w-[360px] relative">
<<<<<<< HEAD
          <SearchIcon className='h-5 w-5 absolute left-[6px] top-1/2 transform -translate-y-1/2 dark:text-gray-300'/>
          <input 
            title='Pesquise por' 
            className="w-full dark:bg-neutral-800 dark:text-gray-200 rounded overflow-hidden text-xs md:text-sm font-normal pl-8 pr-3 py-2" 
            type="text" 
            placeholder="Pesquise por SKU, Nome, Lojas e etc" 
            style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} 
=======
          <SearchIcon className='h-5 w-5 absolute left-[6px] top-1/2 transform -translate-y-1/2 dark:text-gray-300' />
          <input
            title='Pesquise por'
            className="w-full dark:bg-neutral-800 dark:text-gray-200 rounded overflow-hidden text-xs md:text-sm font-normal pl-8 pr-3 py-2"
            style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            placeholder="Pesquise por SKU ou Nome"
            type="text"
>>>>>>> 74018f7c156c6f89ceeb7ea11e3e4edceeabc5e7
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <BtnActionsFilter />
        </div>
        {error && <p className="text-red-500">{error}</p>}

        {products.map(product => (
            <div key={product.id}>
              <p>{product.title}</p>
            </div>
          ))}

        <div className="flex mt-4 md:mt-0 xl:ml-5">
          <select title='Lojas' className="rounded dark:bg-neutral-800 dark:text-gray-200 px-3 py-2 mr-2 w-1/2 lg:w-[160px] xl:w-[200px] text-xs md:text-sm text-neutral-800 font-normal" name="lojas" id="lojas">
            <option className="text-sm text-neutral-800 dark:text-gray-200 font-normal" value="lojas">Lojas</option>
            <option className="text-sm text-neutral-800 dark:text-gray-200 font-normal" value="magalu">Magalu</option>
            <option className="text-sm text-neutral-800 dark:text-gray-200 font-normal" value="mercadoLivre">Mercado Livre</option>
          </select>
          <select onChange={(e) => onFilterChange(e.target.value)} title='Status do produto' className="rounded dark:bg-neutral-800 dark:text-gray-200 px-3 py-2 w-1/2 lg:w-[160px] xl:w-[200px] text-xs md:text-sm text-neutral-800 font-normal" name="status" id="status">
            <option className="text-sm text-neutral-800 font-normal dark:text-gray-200" value="all">Status</option>
            <option className="text-sm text-neutral-800 font-normal dark:text-gray-200" value="active">Ativo</option>
            <option className="text-sm text-neutral-800 font-normal dark:text-gray-200" value="under_review">Revisando</option>
            <option className="text-sm text-neutral-800 font-normal dark:text-gray-200" value="paused">Pausado</option>
          </select>
        </div>

        <div className="flex justify-between mt-4 md:mt-0 xl:ml-4">
          <BtnActive title="Pesquisar" size="btnSimple" onClick={fetchProducts} />
        </div>
      </form>
    </div>
  )
}

export default ProdutosActionsFilter