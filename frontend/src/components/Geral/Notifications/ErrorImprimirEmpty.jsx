import { useEffect, useState } from 'react';
import ErrorIcon from '@mui/icons-material/Error';

const ErrorImprimirEmpty = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 4000); 

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) {
    return null;
  }


  return (
    <div className="bg-red-100 rounded-md text-red-700 p-4 z-10 fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 w-auto" role="alert">
      <div className='flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <ErrorIcon fontSize='small' className="text-red-500" />
          <p className='text-sm'>Oops! Por favor, escolha ao menos um pedido.</p>
        </div>
      </div>
    </div>
  );
};
export default ErrorImprimirEmpty;