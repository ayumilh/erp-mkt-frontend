'use client'
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const EmailAddressUser = () => {
  const { userInfo } = useContext(AuthContext);
  return (<>
    <span className="font-medium w-24 md:w-full overflow-hidden" style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
      {userInfo.length > 0 ? userInfo[0].email : ""}
    </span>
    <KeyboardArrowDownIcon className="-mr-1 ml-2 md:ml-0 h-5 w-5 text-segundaria-900" />
  </>)
}
