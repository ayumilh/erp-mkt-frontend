import { redirect } from "next/navigation";
import { nextAuthOptions } from "../../app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Content from "@/components/Drawer/desktop/SidebarContent";
import ProdutosContent from "@/components/Produtos/ProdutosContent";

const Produtos = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex max-w-full h-screen mx-auto">
      <Content />
      <ProdutosContent />
    </div>
  );
};
export default Produtos;
