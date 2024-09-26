import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import BtnBackPage from '@/components/Geral/Button/BtnBackPage';
import EditarAnuncioContent from "@/components/Produtos/Editar/EditarAnuncioContent";

const Editar = async () => { 
  const session = await getServerSession(nextAuthOptions)
  // if(!session) {
  //   redirect('/login')
  // }
  
  return (
    <div className="p-6 mx-auto flex flex-col items-center space-x-4">
      <div className="w-full xl:max-w-[1264px] flex justify-between items-center h-12 pt-4 px-6 xl:px-0 mx-auto mb-8">
        <BtnBackPage title="Editar Anúncio" modal={false} />
      </div>

      <EditarAnuncioContent />
    </div>
  );
}
export default Editar