import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';

const ErrorNotification = ({ message }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="bg-red-100 rounded-md text-red-700 p-4 z-10 fixed right-0 bottom-10 w-auto" role="alert">
      <div className='flex items-center justify-between'>
        <div className='flex gap-3 items-center'>
          <ErrorIcon className="h-4 w-4 text-red-500" />
          <p className="font-bold">Erro!</p>
        </div>
        <button onClick={() => setIsOpen(false)} className="top-0 right-0 px-4 py-3">
          <CloseIcon className="h-4 w-4 text-red-700" />
        </button>
      </div>
      <p>{message}</p>
    </div>
  );
};
export default ErrorNotification;