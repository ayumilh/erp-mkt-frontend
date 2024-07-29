'use client'
import { useEffect, useState } from 'react';  
import Image from 'next/image';
import axios from 'axios';
import { SACMenuMoreResponsive } from "./Actions/SACMenuMoreResponsive";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';

const SACTabela = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchPerguntas = async () => {
      try {
        const response = await axios.get("https://erp-mkt.vercel.app/api/mercadolivre/get-questions");
        console.log(response.data.questions)
        const retructuredData = response.data.questions.map((question) => {
          return {
            text: question.text,
            answer_date_created: question.answer_date_created,
            answer_text: question.answer_text,
            question_status: question.question_status,
            nickname: question.nickname,
            registration_date: question.registration_date,
            product_sku: question.product_sku,
            title: question.title,
            price: question.price,
            available_quantity: question.available_quantity,
            pictureurls: question.pictureurls,
          };
        })
        setProducts(retructuredData);
        console.log(retructuredData)
      } catch (error) {
        console.error(error);
        setProducts([]);
      }
    }
    fetchPerguntas();
  }, []);

  return (
    <div className="bg-primaria-900 rounded-2xl w-[345px] md:w-[728px] lg:w-[903px] xl:w-[1270px] flex flex-col my-10 overflow-x-auto">
    {products.map((product, index) => (
      <div key={index} className='border-b border-gray-200 p-7'>
        <div className="flex justify-between items-center">
          <div className='flex items-center gap-2'>
            {/* <Image src="" alt='Imagem do produto' width='42' height='42' className="bg-gray-200 w-10 h-10" /> */}
            {product.pictureurls && <Image src={product.pictureurls} alt='Imagem do produto' width={42} height={42} className="w-10 h-10" />}
            <div className="break-words md:break-normal">
              <p className="w-80 font-medium text-sm text-neutral-800 overflow-hidden whitespace-nowrap text-ellipsis">{product.product_sku}</p>
              <span className='text-blue-500 cursor-pointer'>{product.questions_id}</span>
            </div>
          </div>

          <div className='flex items-center gap-1'>
            <span className="text-center">R$ {product.price}</span>
            <span>X {product.available_quantity} Un</span>
            <span><ContentPasteSearchIcon fontSize='small' className='cursor-pointer text-neutral-600'/></span>
            <span>|</span>
            <span className='font-medium text-sm text-neutral-800'>Mercado Envios Agências</span>
          </div>

          <div>
            <span className='font-medium text-sm text-neutral-800'>Lene Modas</span>
          </div>
        </div>

        <div className='flex flex-col items-start mx-3 mt-7'>
          <div className='flex flex-col items-center gap-1'>
            <div className='flex gap-5'>
              <span className='font-semibold'>{product.text}</span>
              <span className='text-neutral-700'>{new Date(product.answer_date_created).toLocaleString()}</span>
            </div>
            <div className='flex gap-1'>
              <span className='text-neutral-600 font-medium'>Comprador: </span>
              <span className='text-neutral-700 font-medium'>{product.nickname}</span>
              <span>|</span>
              <span className='text-neutral-600 font-medium'>Registração: </span>
              <span className='text-neutral-700 font-medium'>{new Date(product.registration_date).toLocaleString()}</span>
            </div>
          </div>

          {product.answer_text && (
            <div className='bg-gray-200 rounded-lg px-4 py-2 mt-5 mx-5'>
              <span className='text-neutral-700'>{product.answer_text}</span>
              <div>
                <span className='text-blue-500 cursor-pointer'>{new Date(product.answer_date_created).toLocaleString()}</span>
                <span> | </span>
                <span className='text-blue-500 cursor-pointer'>Tempo de Resposta: <span className='text-red-500'> 1,05h</span></span>
              </div>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
  );
};

export default SACTabela;