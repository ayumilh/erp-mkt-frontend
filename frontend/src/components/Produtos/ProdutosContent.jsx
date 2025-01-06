'use client'
import { useState } from 'react';
import HamburgerContent from '../Drawer/mobile/HamburgerContent';
import ActionsContent from '../Config/ActionsConfig/ActionsContent';
import ProdutosTabela from './ProdutosTabela';
import ProdutosActionsFilter from './ProdutosActionsFilter';
import ProdutosHeader from './ProdutosHeader';
import TitlePage from '../Geral/TitlePage';
import axios from 'axios';
import { searchUserId } from '../../utils/searchUserId';
import CircularProgress from '@material-ui/core/CircularProgress';
import SuccessNotification from '../Geral/Notifications/SuccessNotification';
import ErrorNotification from '../Geral/Notifications/ErrorNotification';


const ProdutosContent = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState(null);  
  const [loading, setLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);
  const [route, setRoute] = useState('mercadolivre');
  const userId = searchUserId();

  const handleFilterChange = (newFilter) => {
    setFilterStatus(newFilter);
  };

  const handleSyncProducts = async () => {
    if (!userId) return
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/shopee/auth`,
        { userId: userId }
      );
      console.log(response.data);
      setRequestStatus(true);
    } catch (err) {
      setRequestStatus(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full px-4 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center'>
      <div className="w-full flex justify-between items-center h-12 pt-5">
        <div className='flex items-center'>
          <HamburgerContent />
          <TitlePage title='Produtos' />
        </div>
        <ActionsContent />
      </div>

      <div className='w-full flex flex-col items-center mt-7 lg:mb-10'>
        <ProdutosHeader setRoute={setRoute} />
        {/* <button
          onClick={handleSyncProducts}
          className="bg-segundaria-900 hover:bg-segundaria-800 text-white shadow-md hover:shadow-lg rounded-md px-3 py-2 transform hover:-translate-y-0.5 hover:scale-60 transition duration-500 ease-in-out"
        >
          {loading ? <CircularProgress color="inherit" size={12} className='text-white' /> : 'Sincronizar produtos Shopee'}
        </button> */}
        <ProdutosActionsFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} onFilterChange={handleFilterChange} />
        <ProdutosTabela searchTerm={searchTerm} setSearchTerm={setSearchTerm} onFilterStatus={filterStatus} route={route} />
      </div>

      {requestStatus === true && <SuccessNotification message="Produtos da Shopee sincronizados com sucesso" />}
      {requestStatus === false && <ErrorNotification message="Erro ao sincronizar produtos da Shopee" />}
    </div>
  )
}

export default ProdutosContent