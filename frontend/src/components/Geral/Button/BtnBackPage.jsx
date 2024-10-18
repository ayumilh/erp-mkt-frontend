'use client'
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useRouter } from 'next/navigation';

const BtnBackPage = ({title, modal, onClose = () => {}}) => {
    const router = useRouter();
    return (
    <div className='flex flex-row items-center lg:mt-10'>
        <button 
            type="button" 
            onClick={() => { modal ? onClose() : router.back() }}
            className='flex items-center gap-2'
        >
            <ArrowBackIosRoundedIcon style={{ fontSize: '26px' }} className='dark:text-gray-200' />
            <span className={`${modal ? 'text-base ml-3 dark:text-gray-200' : 'text-lg lg:text-2xl font-semibold text-neutral-700 dark:text-gray-200'} transition duration-300 ease-out`}>{title}</span>
        </button>
    </div>
    )
}

export default BtnBackPage