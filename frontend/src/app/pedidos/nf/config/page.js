import { redirect } from "next/navigation";
import { nextAuthOptions } from "../../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Content from "@/components/Drawer/desktop/SidebarContent";
import NfConfigContent from "@/components/Pedidos/Nf/Config/NfConfigContent";
import LogoContent from "@/components/Geral/LogoContent";

const Config = async () => {
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
      <NfConfigContent />
    </main>
  );
};
export default Config;
