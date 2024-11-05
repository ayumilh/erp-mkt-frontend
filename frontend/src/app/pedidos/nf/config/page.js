import { checkSession } from '@/utils/checkSession';
import SidebarContent from "@/components/Drawer/desktop/SidebarContent";
import NfConfigContent from "@/components/Pedidos/Nf/Config/NfConfigContent";

const Config = async () => {
  await checkSession();

  return (
    <main className="flex max-w-full h-screen">
			<SidebarContent />
      <NfConfigContent />
    </main>
  );
};
export default Config;
