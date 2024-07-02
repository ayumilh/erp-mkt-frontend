import { redirect } from 'next/navigation';
import { nextAuthOptions } from '../../app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

import AnaliseContent from '@/components/Analise/AnaliseContent';
import Content from '@/components/Drawer/desktop/SidebarContent'

const Analise = async () => { 
  const session = await getServerSession(nextAuthOptions)
  if(!session) {
    redirect('/login')
  }

  return (
    <div className="flex max-w-full h-screen mx-auto">
      <Content/>
      <AnaliseContent/>
    </div>
  );
}

export default(Analise);