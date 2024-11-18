'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { searchUserId } from '@/utils/searchUserId';
import { FeedbackMenuMoreResponsive } from "./Actions/FeedbackMenuMoreResponsive";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { ModalResponderPerguntas } from './Actions/ModalResponderPerguntas';
import SendIcon from '@mui/icons-material/Send';

const FeedbackTabela = () => {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState([]);
    const [texts, setTexts] = useState({});

    const handleOpen = (index) => {
        setOpen((prevOpen) => {
            const newOpen = [...prevOpen];
            newOpen[index] = !newOpen[index];
            return newOpen;
        });
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetchPerguntas = async () => {
            const userId = searchUserId();
            if (!userId) return;

            try {
                const response = await axios.get("https://erp-mkt.vercel.app/api/mercadolivre/get-questions", {
                    params: { userId }
                });
                setProducts(response.data.questions);
            } catch (error) {
                setProducts([]);
            }
        }
        fetchPerguntas();
    }, []);

    const handleTextChange = (index, event) => {
        const newText = event.target.value;
        const wordCount = countWords(newText);

        if (wordCount <= 1000) {
            const newTexts = { ...texts, [index]: newText };
            setTexts(newTexts);
        }
    };

    const countWords = (text) => {
        return text ? text.trim().split(/\s+/).length : 0;
    };

    return (
        <div className="bg-primaria-900 dark:bg-dark-primaria-900 rounded-2xl w-full flex flex-col mt-4 mb-10 overflow-x-auto">
            {products.map((product, index) => (
                <div key={index} className='border-b border-gray-200 dark:border-neutral-800 p-7'>
                    <div className="flex justify-between items-center">
                        <div className='flex items-center gap-2'>
                            {product.pictureurls && <Image src={product.pictureurls} alt='Imagem do produto' width={42} height={42} className="w-10 h-10" />}
                            <div className="break-words md:break-normal">
                                <p className="w-80 font-medium text-sm text-neutral-800 dark:text-gray-300 overflow-hidden whitespace-nowrap text-ellipsis">{product.product_sku}</p>
                                <span className='text-blue-500 cursor-pointer'>{product.questions_id}</span>
                            </div>
                        </div>

                        <div className='flex items-center gap-1'>
                            <span className="text-center dark:text-gray-200">R$ {product.price}</span>
                            <span className='dark:text-gray-200'>X {product.available_quantity} Un</span>
                            <span><ContentPasteSearchIcon fontSize='small' className='cursor-pointer text-neutral-600 dark:text-gray-200' /></span>
                            <span className='dark:text-gray-200'>|</span>
                            <span className='font-medium text-sm text-neutral-800 dark:text-gray-200'>Mercado Envios Agências</span>
                        </div>

                        <div>
                            <span className='font-medium text-sm text-neutral-800 dark:text-gray-200'>Lene Modas</span>
                        </div>
                    </div>

                    <div className='flex flex-row items-start mx-3 mt-7'>
                        <div className='w-1/2'>
                            <div className='flex flex-col items-center gap-1'>
                                <div className='flex gap-5'>
                                    <span className='font-semibold dark:text-gray-200'>{product.text}</span>
                                    <span className='text-neutral-700 dark:text-gray-400'>{new Date(product.answer_date_created).toLocaleString()}</span>
                                </div>
                                <div className='flex gap-1'>
                                    <span className='text-neutral-600 dark:text-gray-400 font-medium'>Comprador: </span>
                                    <span className='text-neutral-700 dark:text-gray-200 font-medium'>{product.nickname}</span>
                                    <span>|</span>
                                    <span className='text-neutral-600 dark:text-gray-400 font-medium'>Registração: </span>
                                    <span className='text-neutral-700 dark:text-gray-200 font-medium'>{new Date(product.registration_date).toLocaleString()}</span>
                                </div>
                            </div>

                            {product.answer_text && (
                                <div className='bg-gray-200 dark:bg-neutral-800 rounded-lg px-4 py-2 mt-5 mx-5'>
                                    <span className='text-neutral-700 dark:text-gray-300'>{product.answer_text}</span>
                                    <div>
                                        <span className='text-blue-500 cursor-pointer'>{new Date(product.answer_date_created).toLocaleString()}</span>
                                        <span> | </span>
                                        <span className='text-blue-500 cursor-pointer'>Tempo de Resposta: <span className='text-red-500'> 1,05h</span></span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='w-1/2 flex justify-end'>
                            <QuestionAnswerIcon onClick={() => handleOpen(index)} className='text-neutral-600 dark:text-gray-400 hover:text-neutral-900 transition duration-300 ease-out cursor-pointer' />
                        </div>
                        {/* <div className='z-10'>
              {open && <ModalResponderPerguntas onClose={handleClose} />}
            </div> */}
                    </div>

                    {open[index] && (
                        <div>
                            <div className='relative mt-7'>
                                <textarea
                                    className='w-full dark:bg-neutral-800 p-2 font-medium text-neutral-700 ring-2 ring-neutral-300 dark:ring-black outline-blue-500 rounded focus:rounded-lg transition-all duration-300 ease-out'
                                    rows='4'
                                    placeholder='Digite sua resposta aqui...'
                                    value={texts[index] || ""}
                                    onChange={(event) => handleTextChange(index, event)}
                                ></textarea>
                                <div className='absolute bottom-2 right-2 text-right mt-2'>
                                    <span className='text-neutral-500 font-medium'>{countWords(texts[index])} / 1000</span>
                                </div>
                            </div>
                            <div className='flex justify-end gap-3 mt-4'>
                                <button
                                    className='bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition duration-300 ease-out flex items-center'
                                    onClick={() => handleCancel(index)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className='bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition duration-300 ease-out flex items-center'
                                >
                                    <SendIcon size="14"/> <span className='text-white ml-2 text-sm'>Enviar</span>
                                </button>
                            </div>
                        </div>

                    )}
                </div>
            ))}
        </div>
    );
};

export default FeedbackTabela;