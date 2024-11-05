import { checkSession } from '@/utils/checkSession';
import SidebarContent from "@/components/Drawer/desktop/SidebarContent";
import SincronizarContent from "@/components/Estoque/SincronizarAnuncios/SincronizarContent";

const SincronizarAnuncios = async () => { 
  await checkSession();
  
  return (
    <main className="flex max-w-full h-screen">
			<SidebarContent />
      <SincronizarContent />
    </main>
  );
}
export default SincronizarAnuncios