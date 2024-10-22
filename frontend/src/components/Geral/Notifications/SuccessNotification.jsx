import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const SuccessNotification = ({ message }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="bg-green-100 rounded-md text-green-700 p-4 z-10 fixed right-0 bottom-10 w-auto" role="alert">
      <div className='flex items-center justify-between'>
        <div className='flex gap-3 items-center'>
          <div className="w-5 h-5 flex bg-green-500 rounded-full p-1 justify-center items-center">
            <CheckIcon fontSize='small' className="text-white" />
          </div>
          <p className="font-bold">Sucesso!</p>
        </div>
        <button onClick={() => setIsOpen(false)} className="top-0 right-0 px-4 py-3">
          <CloseIcon className="h-4 w-4 text-green-700" />
        </button>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default SuccessNotification;