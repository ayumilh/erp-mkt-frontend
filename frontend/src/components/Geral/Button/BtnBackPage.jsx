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
            className='flex items-center gap-2 text-neutral-600 font-medium hover:text-black transition duration-300 ease-out'
        >
            <ArrowBackIosRoundedIcon/>
            <span className={`${modal ? 'text-base ml-3' : 'text-lg '}`}>{title}</span>
        </button>
    </div>
    )
}

export default BtnBackPage