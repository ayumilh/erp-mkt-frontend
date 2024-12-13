import { checkSession } from '@/utils/checkSession';
import SidebarContent from '@/components/Drawer/desktop/SidebarContent'
import ConfigContent from '@/components/Config/ConfigContent';

const Config = async () => {
    await checkSession();

    return (
        <main className="flex max-w-full h-screen">
            <SidebarContent />
            <ConfigContent />
        </main>
    );
}
export default Config