import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../../app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import Content from '@/components/Drawer/desktop/SidebarContent'
import PedidosContent from '@/components/Pedidos/PedidosContent';
import LogoContent from '@/components/Geral/LogoContent';

const Pedidos = async () => {
  const session = await getServerSession(nextAuthOptions)
  if(!session) {
    redirect('/login')
  }

	return (
    <main className="flex max-w-full h-screen">
			<div className='fixed flex flex-col gap-32'>
				<LogoContent />
				<Content />
			</div>
      <PedidosContent/>
    </main>
	);
}
export default Pedidos