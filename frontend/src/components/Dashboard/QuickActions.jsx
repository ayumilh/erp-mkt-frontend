import StoreIcon from '@mui/icons-material/Store';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SyncIcon from '@mui/icons-material/Sync';


const QuickActions = () => {
  return (
    <div className='w-full flex md:hidden justify-center items-center mb-4 gap-3'>
      <div className='w-20 flex flex-col text-center items-center'>
        <div className='w-16 h-16 py-2 px-2 bg-primaria-900 dark:bg-dark-primaria-900 flex flex-col justify-center items-center rounded-lg active:shadow-md active:-translate-y-1 active:scale-60 transition duration-500 ease-in-out'>
          <StoreIcon sx={{ width: '26px' }} className='text-segundaria-900' />
        </div>
        <span className='w-16 flex-wrap text-segundaria-900 dark:text-indigo-500 text-sm font-medium text-center'>Conectar lojas</span>
      </div>
      <div className='w-20 flex flex-col text-center items-center'>
        <div className='w-16 h-16 py-2 px-2 bg-primaria-900 dark:bg-dark-primaria-900 flex flex-col justify-center items-center rounded-lg active:shadow-md active:-translate-y-1 active:scale-60 transition duration-500 ease-in-out'>
          <FileCopyIcon sx={{ width: '26px' }} className='text-segundaria-900' />
        </div>
        <span className='w-16 flex-wrap text-segundaria-900 dark:text-indigo-500 text-sm font-medium text-center'>Copiar anúncios</span>
      </div>
      <div className='w-20 flex flex-col text-center items-center'>
        <div className='w-16 h-16 py-2 px-2 bg-primaria-900 dark:bg-dark-primaria-900 flex flex-col justify-center items-center rounded-lg active:shadow-md active:-translate-y-1 active:scale-60 transition duration-500 ease-in-out'>
          <ManageAccountsIcon sx={{ width: '26px' }} className='text-segundaria-900' />
        </div>
        <span className='w-16 flex-wrap text-segundaria-900 dark:text-indigo-500 text-sm font-medium text-center'>Gerenciar produtos</span>
      </div>
      <div className='w-20 flex flex-col text-center items-center'>
        <div className='w-16 h-16 py-2 px-2 bg-primaria-900 dark:bg-dark-primaria-900 flex flex-col justify-center items-center rounded-lg active:shadow-md active:-translate-y-1 active:scale-60 transition duration-500 ease-in-out'>
          <SyncIcon sx={{ width: '26px' }} className='text-segundaria-900' />
        </div>
        <span className='w-16 flex-wrap text-segundaria-900 dark:text-indigo-500 text-sm font-medium text-center'>Sincroni<br />zação</span>
      </div>
    </div>
  )
}

export default QuickActions