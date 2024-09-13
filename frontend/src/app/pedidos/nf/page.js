import { redirect } from "next/navigation";
import { nextAuthOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import SidebarContent from "@/components/Drawer/desktop/SidebarContent";
import NfContent from "@/components/Pedidos/Nf/NfContent";

const Nf = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex max-w-full h-screen">
			<SidebarContent />
      <NfContent />
    </main>
  );
};
export default Nf;
