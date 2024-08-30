import BtnActive from "../Geral/Button/BtnActive";
import BtnRoute from "../Geral/Button/BtnRoute";

const ProdutosHeader = () => {
    return (
        <div className="w-full lg:w-[876px] xl:w-[1270px] flex justify-between mb-6">
            <div className="flex gap-4">
                <BtnRoute route="/produtos" size='full' btn='base' txt='base' activePage={true}>
                    Ativos
                </BtnRoute>
                <BtnRoute route="/produtos" size='full' btn='base' txt='base'>
                    Produtos do armazém
                </BtnRoute>
            </div>

            <div className="flex gap-3 justify-end">
                <div className="flex flex-row gap-0 md:gap-0">
                    <BtnRoute route="/produtos/anuncioCopiado" size='full' btn='base' txt='base'>
                        Copiar anúncio
                    </BtnRoute>
                    <BtnRoute route="/produtos" size='full' btn='base' txt='base'>
                        Usar imagem de anúncio
                    </BtnRoute>
                    <BtnRoute route="/produtos" size='full' btn='base' txt='base'>
                        Importar e Exportar
                    </BtnRoute>
                </div>
                <div>
                    <BtnActive title="Criar anúncio" page="/produtos/criarAnuncio" size="btnHeader" />
                </div>
            </div>
        </div>
    )
}

export default ProdutosHeader