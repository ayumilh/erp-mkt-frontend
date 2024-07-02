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
        >
            <ArrowBackIosRoundedIcon/>
            <span className={`font-semibold text-colorFont-200 ${modal ? 'text-base ml-3' : 'text-lg lg:text-xl ml-5 md:ml-10 lg:ml-14 '}`}>{title}</span>
        </button>
    </div>
    )
}

export default BtnBackPage