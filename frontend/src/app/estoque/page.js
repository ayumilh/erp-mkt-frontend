import { checkSession } from '@/utils/checkSession';
import SidebarContent from '@/components/Drawer/desktop/SidebarContent'
import EstoqueContent from '@/components/Estoque/EstoqueContent';

const Estoque = async () => {
  await checkSession();

	return (
    <main className="flex max-w-full h-screen">
			<SidebarContent />
      <EstoqueContent/>
    </main>
	);
}
export default Estoque