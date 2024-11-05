import { checkSession } from '@/utils/checkSession';
import SidebarContent from "@/components/Drawer/desktop/SidebarContent";
import ProdutosContent from "@/components/Produtos/ProdutosContent";

const Produtos = async () => {
    await checkSession();

    return (
        <main className="flex max-w-full h-screen">
            <SidebarContent />
            <ProdutosContent />
        </main>
    );
};
export default Produtos;
