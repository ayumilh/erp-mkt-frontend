"use client";
import { useState } from "react";
import { searchUserId } from '@/utils/searchUserId';
import axios from "axios";
import BtnActions from "@/components/Geral/Button/BtnActions";

const CriarAnuncioContent = () => {
  const [isInvalidoTitle, setIsInvalidoTitle] = useState(false);
  const [isInvalidoQuantity, setIsInvalidoQuantity] = useState(false);
  const [isInvalidoPreco, setIsInvalidoPreco] = useState(false);

  const [input, setInputs] = useState({
    title: "",
    price: "",
    quantity: 0,
    listing: "",
    condition: "",
    // description: "",
    // video_id: "",
    warrantyType: "",
    warrantyTemp: "0",
    pictureUrls: [],
    brand: "",
    gtin: "",
  });

  const inputChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setInputs((prevInput) => ({
      ...prevInput,
      pictureUrls: files,
    }));
  };


  const handleCriar = async (e) => {
    e.preventDefault();

    console.log(input);

    const userId = searchUserId();
    if (!userId) return;

    const formData = new FormData();
    Object.keys(input).forEach(key => {
      if (key !== 'pictureUrls') {
        formData.append(key, input[key]);
      }
    });

    if (input.pictureUrls && input.pictureUrls[0]) {
      formData.append('file', input.pictureUrls[0]);
    }

    formData.append('userId', userId);

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mercadolivre/criar-anuncio`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
    }
  };


  // condição da garantia
  const [garantia, setGarantia] = useState("");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "garantia") {
      setGarantia(value);
      setInputs((prevInput) => ({
        ...prevInput,
        warrantyType: value,
      }));
    }
    setInputs((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  return (
    <div className='w-full xl:max-w-screen-lg flex flex-col mt-10 pb-8'>
      <h3 className='text-neutral-800 dark:text-gray-200 text-xl font-medium'>
        {input.title || ""}
      </h3>

      <div className='flex gap-6 mt-5 mb-2 relative'>
        <h3 className='text-neutral-800 dark:text-gray-200 text-lg font-semibold'>Gerais</h3>
      </div>

      <div className='flex flex-wrap transition-transform duration-500 ease-in'>
        {/* gerais */}
        <div className='w-full flex flex-wrap mt-5 mb-7'>
          <div className="w-full mt-3 mb-4 px-3">
            <label htmlFor="title" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Title <span className='text-red-600'>*</span></label>
            <input
              onChange={inputChange}
              maxLength={255}
              name='title'
              required
              type="text"
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoTitle ? 'outline-red-500 focus:outline-red-500' : ''}`}
            />
          </div>

          <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
            <span className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">
              Listagem
            </span>
            <select
              name="listing"
              onChange={inputChange}
              className="peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out"
            >
              <option value="gold_pro">Premium</option>
              <option value="gold_special">Clássico</option>
              <option value="free">Grátis</option>
            </select>
          </div>

          <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
            <label htmlFor="condition" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Condição</label>
            <select
              id="condition"
              name="condition"
              onChange={inputChange}
              className="peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out"
            >
              <option value="new">Novo</option>
              <option value="used">Usado</option>
            </select>
          </div>

          <div className='w-full md:w-1/5 flex flex-col mt-3 mb-4 px-3'>
            <label htmlFor="price" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Preço</label>
            <div className="relative">
              <div className="relative flex items-center">
                <span className="absolute left-0 pl-4 py-2 rounded-l-sm focus:rounded-lg font-medium text-neutral-600 dark:text-gray-300">R$</span>
                <input
                  onChange={inputChange}
                  name='price'
                  type="text"
                  placeholder="0,00"
                  className={`peer rounded-sm border w-full pl-12 pr-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoPreco ? 'outline-red-500 focus:outline-red-500' : ''}`}
                />
              </div>
              {isInvalidoPreco && <span className="absolute text-red-500 text-sm ml-2 mt-1">Valor inválido</span>}
            </div>
          </div>

          <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
            <label htmlFor="quantity" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Quantidade <span className='text-red-600'>*</span></label>
            <input
              onChange={inputChange}
              maxLength={255}
              name='quantity'
              required
              type="text"
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoQuantity ? 'outline-red-500 focus:outline-red-500' : ''}`}
            />
          </div>

          <div className="w-full mt-3 mb-4 px-3">
            <label htmlFor="description" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Descrição</label>
            <textarea
              onChange={inputChange}
              name='description'
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out`}
            />
          </div>
        </div>


        <div className='w-full'>
          <hr style={{ border: '1px solid #d1d5db' }} />
        </div>

        {/* informações de venda */}
        <div className='w-full flex flex-col mt-5 mb-7'>
          <h3 className='text-neutral-800 dark:text-gray-200 text-lg font-semibold'>Informações de venda</h3>
          <div className='w-full flex flex-wrap mt-5'>
            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="brand" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Marca</label>
              <input
                onChange={inputChange}
                maxLength={255}
                name='brand'
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out`}
              />
            </div>

            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="gtin" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">GTIN</label>
              <input
                onChange={inputChange}
                maxLength={255}
                name='gtin'
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out`}
              />
            </div>

            <div className="flex w-full items-center px-3">
              <div className="w-full md:w-3/5 flex flex-col mt-5 mb-7">
                <span className="mb-2 font-medium text-neutral-800 dark:text-gray-200">
                  Garantia
                </span>
                <div className="flex flex-col md:flex-row gap-4">
                  <label>
                    <input
                      type="radio"
                      value="Garantia do vendedor"
                      name="garantia"
                      onChange={handleInputChange}
                    />
                    <span className="font-normal ml-2 dark:text-gray-200">
                      Garantia do vendedor
                    </span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="De Fábrica"
                      name="garantia"
                      onChange={handleInputChange}
                    />
                    <span className="font-normal ml-2 dark:text-gray-200">
                      De Fábrica
                    </span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Sem garantia"
                      name="garantia"
                      onChange={handleInputChange}
                    />
                    <span className="font-normal ml-2 dark:text-gray-200">
                      Sem garantia
                    </span>
                  </label>
                </div>
              </div>

              {garantia !== "Sem garantia" && (
                <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
                  <label htmlFor="warrantyTemp" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Tempo de garantia</label>
                  <input
                    onChange={inputChange}
                    maxLength={255}
                    name='warrantyTemp'
                    type="text"
                    className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='w-full'>
          <hr style={{ border: '1px solid #d1d5db' }} />
        </div>

        {/* mídia */}
        <div className='w-full flex flex-col mt-5 mb-7'>
          <h3 className='text-neutral-800 dark:text-gray-200 text-lg font-semibold'>Mídia</h3>
          <div className='w-full flex flex-wrap mt-5'>
            <div className="w-full mt-3 mb-4 px-3">
              <label htmlFor="pictureUrls" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">URL da imagem</label>
              <input
                onChange={handleFileChange}
                type="file"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-between mt-10'>
        <BtnActions
          onClick={handleCriar}
          title='Criar Anúncio'
          color='ativado'
          padding='md'
        />
      </div>
    </div>
  );
};

export default CriarAnuncioContent;
