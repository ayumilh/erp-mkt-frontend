import { redirect } from "next/navigation";
import { nextAuthOptions } from "../../../app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import SidebarContent from "@/components/Drawer/desktop/SidebarContent";
import AnuncioCopiadoContent from "@/components/Produtos/AnuncioCopiado/AnuncioCopiadoContent";

const AnuncioCopiado = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex max-w-full h-screen">
			<SidebarContent />
      <AnuncioCopiadoContent />
    </main>
  );
};
export default AnuncioCopiado;
