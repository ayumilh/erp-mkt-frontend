import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../../../app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import SidebarContent from "@/components/Drawer/desktop/SidebarContent";
import SincronizarContent from "@/components/Estoque/SincronizarAnuncios/SincronizarContent";

const SincronizarAnuncios = async () => { 
  const session = await getServerSession(nextAuthOptions)
  if(!session) {
    redirect('/login')
  }
  
  return (
    <main className="flex max-w-full h-screen">
			<SidebarContent />
      <SincronizarContent />
    </main>
  );
}
export default SincronizarAnuncios