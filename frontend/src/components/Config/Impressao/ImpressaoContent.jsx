import React from 'react'

const ImpressaoContent = () => {
  return (
    <div className='flex flex-col gap-7 mt-5 items-start justify-start w-full p-4'>
      {/* planilha */}
      <div className='max-w-screen-xs flex gap-4'>
        <label className='w-1/2 text-neutral-800 dark:text-gray-300 font-medium'>
          Planilha de Pick List
        </label>
        <div className='w-1/2 flex gap-3'>
          <label className='flex items-center gap-2 text-neutral-700 dark:text-gray-200 font-medium'>
            <input type="radio" name="option" value="predefinir" />
            Predefinir
          </label>
          <label className='flex items-center gap-2 text-neutral-700 dark:text-gray-200 font-medium'>
            <input type="radio" name="option" value="personalizado" />
            Personalizado
          </label>
        </div>
      </div>
      {/* formato */}
      <div className='max-w-screen-xs flex'>
        <label htmlFor="formato" className='w-1/2 text-neutral-800 dark:text-gray-300 font-medium'>Formato:</label>
        <select className='w-1/2 text-neutral-700 dark:text-gray-200 dark:bg-neutral-800' id="formato" name="formato">
          <option value="simples" className='text-neutral-700 dark:text-gray-200'>Simples</option>
          <option value="simples-imagem" className='text-neutral-700 dark:text-gray-200'>Simples com imagem de produto</option>
          <option value="padrao" className='text-neutral-700 dark:text-gray-200'>Padrão</option>
          <option value="padrao-imagem" className='text-neutral-700 dark:text-gray-200'>Padrão com imagem de produto</option>
        </select>
      </div>
      {/* Configuração */}
      <div className='max-w-screen-xs flex'>
        <label className='w-1/2 text-neutral-800 dark:text-gray-300 font-medium'>Configuração:</label>
        <div className='w-1/2 flex flex-col'>
          <label className='flex items-center gap-2 whitespace-nowrap text-neutral-700 dark:text-gray-200 font-medium'>
            <input type="checkbox" name="config" value="rastreio" />
            Adicionar Número de Rastreio
          </label>
          <label className='flex items-center gap-2 whitespace-nowrap text-neutral-700 dark:text-gray-200 font-medium'>
            <input type="checkbox" name="config" value="notas-cliente" />
            Adicionar Notas do Cliente
          </label>
          <label className='flex items-center gap-2 whitespace-nowrap text-neutral-700 dark:text-gray-200 font-medium'>
            <input type="checkbox" name="config" value="sku-armazem" />
            Adicionar SKU do Armazém
          </label>
          <label className='flex items-center gap-2 whitespace-nowrap text-neutral-700 dark:text-gray-200 font-medium'>
            <input type="checkbox" name="config" value="observacoes" />
            Adicionar Observações
          </label>
        </div>
      </div>
    </div>
  )
}

export default ImpressaoContent