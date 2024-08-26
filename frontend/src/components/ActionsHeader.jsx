import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { EmailAddressUser } from "./Drawer/EmailAddressUser";

const ActionsHeader = () => {
  return (
    <div className="items-center justify-center lg:flex hidden">
      <NotificationsNoneIcon className="h-6 w-6 mr-4 text-colorFont-200" />
      <div className="bg-primaria-900 bg-opacity-70 shadow-sm flex px-3 py-2 rounded-full">
        <AccountCircleIcon className="h-6 w-6 text-colorFont-200" />
        <button
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "24px",
            color: "blue",
            fontSize: "16px",
            marginLeft: "12px",
          }}
        >
          <EmailAddressUser />
        </button>
      </div>
    </div>
  );
};

export default ActionsHeader;
