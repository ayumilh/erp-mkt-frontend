import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../../app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import Content from '@/components/Drawer/desktop/SidebarContent'
import ComprarContent from '@/components/Comprar/ComprarContent';

const Comprar = async() => {
  const session = await getServerSession(nextAuthOptions)
  if(!session) {
    redirect('/login')
  }

	return (
    <div className="flex max-w-full h-screen mx-auto">
      <Content/>
      <ComprarContent/>
    </div>
	);
}
export default Comprar