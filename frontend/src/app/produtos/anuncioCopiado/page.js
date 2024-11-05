import { checkSession } from '@/utils/checkSession';
import SidebarContent from "@/components/Drawer/desktop/SidebarContent";
import AnuncioCopiadoContent from "@/components/Produtos/AnuncioCopiado/AnuncioCopiadoContent";

const AnuncioCopiado = async () => {
  await checkSession();

  return (
    <main className="flex max-w-full h-screen">
      <SidebarContent />
      <AnuncioCopiadoContent />
    </main>
  );
};
export default AnuncioCopiado;
