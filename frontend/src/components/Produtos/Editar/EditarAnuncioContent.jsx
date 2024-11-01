"use client";
import { useEffect, useState } from "react";
import { searchUserId } from '@/utils/searchUserId';
import axios from "axios";
import Cookies from "js-cookie";
import BtnActions from "@/components/Geral/Button/BtnActions";


const EditarAnuncioContent = () => {
  const [secaoAtiva, setSecaoAtiva] = useState('gerais');

  const [isInvalidoTitle, setIsInvalidoTitle] = useState(false);
  const [isInvalidoQuantity, setIsInvalidoQuantity] = useState(false);
  const [isInvalidoPreco, setIsInvalidoPreco] = useState(false);

  const [input, setInputs] = useState({
    title: "",
    price: "",
    quantity: "",
    // listing: "",
    condition: "",
    // description: "",
    // video_id: "",
    warrantyType: "",
    warrantyTemp: "",
    pictureUrls: "",
    brand: "",
    gtin: "",
  });

  const inputChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const productSKU = Cookies.get("selectedSku");

  const userId = searchUserId();

  // buscando produto pelo sku
  useEffect(() => {
    const fetchProduct = async () => {
      if (!userId) return

      try {
        const response = await axios.get(
          `https://erp-mkt.vercel.app/api/mercadolivre/productid?sku=${productSKU}`, {
          params: { userId }
        });
        console.log(response.data.products[0]);
        setInputs(response.data.products[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [productSKU, userId]);


  const handleEditar = async (e) => {
    e.preventDefault();
    if (!userId) return;

    try {
      await axios.put(`https://erp-mkt.vercel.app/api/mercadolivre/update-anuncio`, {
        ...input,
        productSKU,
        params: { userId }
      });
    } catch (error) {
      console.error(error);
    }
  };

  // condição da garantia
  const [garantia, setGarantia] = useState("");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "garantia") {
      setGarantia(value);
    }
    setInputs((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  return (
    <div className='w-full xl:max-w-screen-lg flex flex-col mt-10'>
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
              value={input.title || ''}
              maxLength={255}
              name='title'
              required
              type="text"
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoTitle ? 'outline-red-500 focus:outline-red-500' : ''}`}
            />
          </div>

          <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
            <label htmlFor="condition" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Condição</label>
            <div className="flex flex-col md:flex-row gap-7 mt-1">
              <label>
                <input
                  type="radio"
                  value="new"
                  checked={input.condition === 'new'}
                  name="condition"
                  onChange={inputChange}
                />
                <span className="font-normal ml-2 dark:text-gray-200">Novo</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="used"
                  name="condition"
                  checked={input.condition === 'used'}
                  onChange={inputChange}
                />
                <span className="font-normal ml-2 dark:text-gray-200">Usado</span>
              </label>
            </div>
          </div>

          <div className='w-full md:w-1/5 flex flex-col mt-3 mb-4 px-3'>
            <label htmlFor="price" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Preço</label>
            <div className="relative">
              <div className="relative flex items-center">
                <span className="absolute left-0 pl-4 py-2 rounded-l-sm focus:rounded-lg font-medium text-neutral-600 dark:text-gray-300">R$</span>
                <input
                  onChange={inputChange}
                  value={input.price || ""}
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
              value={input.available_quantity || ''}
              maxLength={255}
              name='quantity'
              required
              type="text"
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoQuantity ? 'outline-red-500 focus:outline-red-500' : ''}`}
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
                value={input.brand || ''}
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
                value={input.gtin || ''}
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
                      checked={
                        input.warrantyType ===
                        "Garantia do vendedor"
                      }
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
                      checked={input.warrantyType === "De Fábrica"}
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
                      checked={input.warrantyType === "Sem garantia"}
                      onChange={handleInputChange}
                    />
                    <span className="font-normal ml-2 dark:text-gray-200">
                      Sem garantia
                    </span>
                  </label>
                </div>
              </div>

              {garantia !== "Sem garantia" && (
                <div className="w-full md:w-1/5">
                  <input
                    onChange={handleInputChange}
                    name="tempo_garantia"
                    value={input.warrantyTemp || ""}
                    type="text"
                    placeholder="Tempo de garantia"
                    className='peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out'
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
                onChange={inputChange}
                value={input.pictureurls || ''}
                maxLength={255}
                name='pictureUrls'
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-between mt-10'>
        <BtnActions
          onClick={handleEditar}
          text='Editar Anúncio'
          color='success'
          className='w-32'
        />
      </div>
    </div>
  );
};

export default EditarAnuncioContent;
