import { redirect } from "next/navigation";
import { nextAuthOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Content from "@/components/Drawer/desktop/SidebarContent";
import NfContent from "@/components/Pedidos/Nf/NfContent";
import LogoContent from "@/components/Geral/LogoContent";

const Nf = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="flex max-w-full h-screen">
			<div className='fixed flex flex-col gap-32'>
				<LogoContent />
				<Content />
			</div>
      <NfContent />
    </main>
  );
};
export default Nf;
