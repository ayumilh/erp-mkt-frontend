import { checkSession } from '@/utils/checkSession';
import Content from '@/components/Drawer/desktop/SidebarContent'
import ActionsHeader from '@/components/ActionsHeader';
import HamburgerContent from '@/components/Drawer/mobile/HamburgerContent';
import BtnBackPage from '@/components/Geral/Button/BtnBackPage';
import EditarAnuncioContent from "@/components/Produtos/Editar/EditarAnuncioContent";

const Editar = async () => {
  await checkSession();

  return (
    <div className="flex max-w-full h-screen">
      <Content />
      <div className='w-full px-4 lg:px-0 lg:mx-5 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center'>
        <div className="w-full flex justify-between items-center h-12 pt-4 mb-8">
          <div className='flex items-center'>
            <HamburgerContent />
            <div className="w-full xl:max-w-[1264px] flex justify-between items-center h-12 pt-4 px-6 xl:px-0 mx-auto mb-8">
              <BtnBackPage modal={false} title="Voltar" />
            </div>
          </div>
          <ActionsHeader />
        </div>

        <EditarAnuncioContent />
      </div>
    </div>
  );
}
export default Editar