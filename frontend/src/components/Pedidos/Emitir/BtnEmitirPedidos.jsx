import { useState } from 'react'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CircularProgress from '@mui/material/CircularProgress';

const BtnEmitirPedidos = ({ onClick }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
      setLoading(true);
      try {
        await onClick();
      } finally {
        setLoading(false);
      }
    };

    return (
        <button
            onClick={handleClick}
            aria-controls="btn-pie"
            aria-haspopup="true"
            className="w-full h-8 px-2 my-1 md:rounded-lg md:border md:border-gray-200 dark:md:border-neutral-700 md:hover:border-[#c7c7c7] focus:outline-none focus:ring-1 md:focus:ring-[#d4d4d4] flex items-center justify-start md:justify-center"
        >
            {loading ? (
                <CircularProgress color="inherit" size={20} className="mr-2" />
            ) : (
                <ReceiptLongIcon fontSize='small' className="mr-2 text-neutral-700 dark:text-gray-300" />
            )}
            <span className="text-neutral-700 hover:text-black dark:text-gray-200 text-sm font-medium">
                Emitir nota fiscal
            </span>
        </button>
    )
}

export default BtnEmitirPedidos