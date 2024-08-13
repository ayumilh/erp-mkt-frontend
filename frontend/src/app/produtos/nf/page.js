import { redirect } from "next/navigation";
import { nextAuthOptions } from "../../../app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Content from "@/components/Drawer/desktop/SidebarContent";
import NfContent from "@/components/Produtos/Nf/NfContent";

const Nf = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex max-w-full h-screen mx-auto">
      <Content />
      <NfContent />
    </div>
  );
};
export default Nf;
