import { checkSession } from '@/utils/checkSession';
import BtnBackPage from '@/components/Geral/Button/BtnBackPage';
import EstoqueEditarProduto from "@/components/Estoque/Editar/EstoqueEditarProduto";

const Editar = async () => {
  await checkSession();

  return (
    <div className="px-4 h-screen flex flex-col items-center">
    <div className="w-full xl:max-w-[1264px] flex justify-between items-center h-12 pt-4 px-6 xl:px-0 mx-auto mb-8">
      <BtnBackPage modal={false} title="Editar Produto"/>
    </div>
    
    <EstoqueEditarProduto />
  </div>
  );
}
export default Editar