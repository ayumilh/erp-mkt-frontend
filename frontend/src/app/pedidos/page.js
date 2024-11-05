import { checkSession } from '@/utils/checkSession';
import SidebarContent from '@/components/Drawer/desktop/SidebarContent'
import PedidosContent from '@/components/Pedidos/PedidosContent';

const Pedidos = async () => {
  await checkSession();

	return (
    <main className="flex max-w-full h-screen">
			<SidebarContent />
      <PedidosContent/>
    </main>
	);
}
export default Pedidos