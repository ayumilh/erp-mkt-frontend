import { checkSession } from '@/utils/checkSession';

import AnaliseContent from '@/components/Analise/AnaliseContent';
import SidebarContent from '@/components/Drawer/desktop/SidebarContent'

const Analise = async () => { 
  await checkSession();

  return (
    <main className="flex max-w-full h-screen">
			<SidebarContent />
      <AnaliseContent/>
    </main>
  );
}

export default(Analise);