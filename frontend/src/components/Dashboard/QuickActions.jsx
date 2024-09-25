import StoreIcon from '@mui/icons-material/Store';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'; // Novo ícone


const QuickActions = () => {
  return (
    <div className='w-full flex lg:hidden justify-start items-center mb-4 gap-3'>
      <div className='w-1/3 h-20 py-2 px-2 bg-primaria-900 dark:bg-dark-primaria-900 flex flex-col justify-center items-center rounded-lg active:shadow-md active:-translate-y-1 active:scale-60 transition duration-500 ease-in-out'>
        <StoreIcon sx={{ width: '18px' }} className='text-segundaria-900' />
        <span className='text-segundaria-900 text-sm font-medium text-center'>Conectar lojas</span>
      </div>
      <div className='w-1/3 h-20 py-2 px-2 bg-primaria-900 dark:bg-dark-primaria-900 flex flex-col justify-center items-center rounded-lg active:shadow-md active:-translate-y-1 active:scale-60 transition duration-500 ease-in-out'>
        <FileCopyIcon sx={{ width: '18px' }} className='text-segundaria-900' />
        <span className='text-segundaria-900 text-sm font-medium text-center'>Copiar anúncios</span>
      </div>
      <div className='w-1/3 h-20 py-2 px-2 bg-primaria-900 dark:bg-dark-primaria-900 flex flex-col justify-center items-center rounded-lg active:shadow-md active:-translate-y-1 active:scale-60 transition duration-500 ease-in-out'>
        <ManageAccountsIcon sx={{ width: '18px' }} className='text-segundaria-900' />
        <span className='text-segundaria-900 text-sm font-medium text-center'>Gerenciar produtos</span>
      </div>
    </div>
  )
}

export default QuickActions