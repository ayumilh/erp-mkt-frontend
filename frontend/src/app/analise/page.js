import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../../app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import AnaliseContent from '@/components/Analise/AnaliseContent';
import SidebarContent from '@/components/Drawer/desktop/SidebarContent'

const Analise = async () => { 
  const session = await getServerSession(nextAuthOptions)
  if(!session) {
    redirect('/login')
  }

  return (
    <main className="flex max-w-full h-screen">
			<SidebarContent />
      <AnaliseContent/>
    </main>
  );
}

export default(Analise);