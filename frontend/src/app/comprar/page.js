import { checkSession } from '@/utils/checkSession';
import SidebarContent from '@/components/Drawer/desktop/SidebarContent'
import ComprarContent from '@/components/Comprar/ComprarContent';

const Comprar = async() => {
  await checkSession();

	return (
    <main className="flex max-w-full h-screen">
			<SidebarContent />
      <ComprarContent/>
    </main>
	);
}
export default Comprar