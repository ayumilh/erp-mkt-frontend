'use client'
import React, { useState, useRef, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import FilterListIcon from '@mui/icons-material/FilterList';

const BtnActionsFilter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const [filters, setFilters] = useState({
    precoMin: '',
    precoMax: '',
    custoMin: '',
    custoMax: '',
    pesoMin: '',
    pesoMax: '',
    codigoBarras: '',
    ncm: '',
    plataforma: '',
    loja: ''
  });

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleReset = () => {
    setFilters({
      precoMin: '',
      precoMax: '',
      custoMin: '',
      custoMax: '',
      pesoMin: '',
      pesoMax: '',
      codigoBarras: '',
      ncm: '',
      plataforma: '',
      loja: ''
    });
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModal();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleConfirm = () => {
    handleCloseModal();
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div>
      <button className="rounded" type="button" onClick={handleButtonClick}>
        <FilterListIcon className='h-6 w-6 ml-[6px] dark:text-gray-300 dark:hover:text-white'/>
      </button>

      {isModalOpen && (
        <div className={`origin-top-center absolute z-50 mt-5 w-full rounded-md shadow-lg bg-primaria-900 dark:bg-dark-primaria-900 ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out transform ${isModalOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div ref={modalRef} className="relative bg-white dark:bg-neutral-800 p-4 rounded shadow-lg" style={{ width: '620px', height: '530px' }}>
            <div className="absolute top-0 left-[18px] transform -translate-x-1/2 -translate-y-full">
              <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white dark:border-b-neutral-800"></div>
            </div>
            <button onClick={handleCloseModal} className="absolute top-0 right-0 m-3 active:bg-gray-300 dark:active:bg-neutral-600 bg-opacity-80 rounded-full p-1">
              <CloseIcon fontSize='small' className="text-gray-700 dark:text-gray-200" />
            </button>
            <div className='w-full'>
              <h2 className="font-semibold mb-4 dark:text-gray-200">Mais filtros</h2>
              <div className="w-full mb-4 flex items-center justify-end pl-2">
                <label className="w-1/3 text-gray-700 dark:text-gray-200">Preço de Varejo</label>
                <input type="number" name="precoMin" value={filters.precoMin} onChange={handleChange} placeholder="Mínimo" className="w-1/3 p-2 mr-1 border rounded dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-200" />
                <span className='dark:text-gray-300'>-</span>
                <input type="number" name="precoMax" value={filters.precoMax} onChange={handleChange} placeholder="Máximo" className="w-1/3 p-2 ml-1 border rounded dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-200" />
              </div>
              <div className="w-full mb-4 flex items-center justify-end pl-2">
                <label className="w-1/3 text-gray-700 dark:text-gray-200">Custo de Compra</label>
                <input type="number" name="custoMin" value={filters.custoMin} onChange={handleChange} placeholder="Mínimo" className="w-1/3 p-2 mr-1 border rounded dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-200" />
                <span className='dark:text-gray-300'>-</span>
                <input type="number" name="custoMax" value={filters.custoMax} onChange={handleChange} placeholder="Máximo" className="w-1/3 p-2 ml-1 border rounded dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-200" />
              </div>
              <div className="w-full mb-4 flex items-center justify-end pl-2">
                <label className="w-1/3 text-gray-700 dark:text-gray-200">Peso do Pacote</label>
                <input type="number" name="pesoMin" value={filters.pesoMin} onChange={handleChange} placeholder="Mínimo" className="w-1/3 p-2 mr-1 border rounded dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-200" />
                <span className='dark:text-gray-300'>-</span>
                <input type="number" name="pesoMax" value={filters.pesoMax} onChange={handleChange} placeholder="Máximo" className="w-1/3 p-2 ml-1 border rounded dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-200" />
              </div>
              <div className="w-full mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 dark:text-gray-200">Código de Barras</label>
                <select name="codigoBarras" placeholder="Por favor selecione" value={filters.codigoBarras} onChange={handleChange} className="w-2/3 p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-200">
                <option value="" disabled>Por favor selecione</option>
                  <option value="">Tudo</option>
                  <option value="tem">Tem códigos de barras</option>
                  <option value="nao-tem">Não tem</option>
                </select>
              </div>
              <div className="w-full mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 dark:text-gray-200">NCM</label>
                <input type="text" name="ncm" value={filters.ncm} onChange={handleChange} placeholder="NCM" className="w-2/3 p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-200" />
              </div>
              <div className="w-full mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 dark:text-gray-200">Plataforma</label>
                <input type="text" name="plataforma" value={filters.plataforma} onChange={handleChange} placeholder="Plataforma" className="w-2/3 p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-200" />
              </div>
              <div className="w-full mb-4 flex items-center">
                <label className="w-1/3 text-gray-700 dark:text-gray-200">Loja</label>
                <input type="text" name="loja" value={filters.loja} onChange={handleChange} placeholder="Loja" className="w-2/3 p-2 border rounded dark:bg-neutral-700 dark:border-neutral-600 dark:text-gray-200" />
              </div>
              <div className="flex justify-end space-x-2">
                <button type='button' onClick={handleReset} className="px-4 py-2 bg-gray-300 dark:bg-neutral-600 text-gray-700 dark:text-gray-200 rounded">Resetar</button>
                <button type='button' onClick={handleConfirm} className="px-4 py-2 bg-blue-500 text-white rounded">Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BtnActionsFilter;