'use client'
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useSession } from "next-auth/react";

export const EmailAddressUser = () => {
  const { userInfo } = useContext(AuthContext);
  const { data: session } = useSession();
  return (<>
    <span 
      className="font-medium max-w-28 md:w-full overflow-hidden" 
      style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} 
      title={session?.session?.user?.email || (userInfo.length > 0 ? userInfo[0].email : "")}
    >
      {session?.session?.user?.email || (userInfo.length > 0 ? userInfo[0].email : "")}
    </span>
    <KeyboardArrowDownIcon className="-mr-1 ml-2 md:ml-0 h-5 w-5 text-segundaria-900" />
  </>)
}