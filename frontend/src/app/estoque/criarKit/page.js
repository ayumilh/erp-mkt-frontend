import { checkSession } from '@/utils/checkSession';
import BtnBackPage from '@/components/Geral/Button/BtnBackPage';
import FormularioCriar from '@/components/Estoque/Criar/Kit/KitFormularioCriar';

const CriarKit = async () => { 
  await checkSession();

  return (
    <div className="px-4 h-screen flex flex-col items-center">
      <div className="w-full xl:max-w-[1264px] flex justify-between items-center h-12 pt-4 px-6 xl:px-0 mx-auto mb-8">
        <BtnBackPage modal={false} title="Criar Kit"/>
      </div>
      
      <FormularioCriar/>
    </div>
  );
}
export default CriarKit