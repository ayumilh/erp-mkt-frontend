import BtnActive from "../Geral/Button/BtnActive";
import BtnRoute from "../Geral/Button/BtnRoute";

const ProdutosHeader = () => {
  return (
    <div className="w-full lg:w-[876px] xl:w-[1270px] flex flex-col mb-6">
      <div className="flex mb-8 gap-6">
        <div style={{ display: 'inline-block' }}>
          <p className="hover:text-black font-medium hover:cursor-pointer">Ativos</p>
          <hr className="border-segundaria-900 border-[1.5px]" />
        </div>
        <div style={{ display: 'inline-block' }}>
          <p className="hover:text-black font-medium hover:cursor-pointer">Produtos do armazem</p>
          {/* <hr className="border-segundaria-900 border-[1.5px]" /> */}
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <div className="flex flex-row gap-0 md:gap-6">
          <BtnRoute route="/produtos" size='full' btn='base' txt='base'>
            Usar imagem de anúncio
          </BtnRoute>
          <BtnRoute route="/produtos" size='full' btn='base' txt='base'>
            Importar e Exportar
          </BtnRoute>
        </div>
        <div>
          <BtnActive title="Criar anúncio" page="/produtos/criarAnuncio" size="btnHeader"/>
        </div>
      </div>
    </div>
  )
}

export default ProdutosHeader