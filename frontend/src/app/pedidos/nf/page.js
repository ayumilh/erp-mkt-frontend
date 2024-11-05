import { checkSession } from '@/utils/checkSession';
import SidebarContent from "@/components/Drawer/desktop/SidebarContent";
import NfContent from "@/components/Pedidos/Nf/NfContent";

const Nf = async () => {
  await checkSession();
  
  return (
    <main className="flex max-w-full h-screen">
			<SidebarContent />
      <NfContent />
    </main>
  );
};
export default Nf;
