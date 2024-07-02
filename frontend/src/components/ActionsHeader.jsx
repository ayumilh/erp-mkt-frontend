import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { EmailAddressUser } from "./Drawer/EmailAddressUser";

const ActionsHeader = () => {
  return (
    <div className="items-center lg:flex hidden">
      <NotificationsNoneIcon className="h-6 w-6 mr-6 text-colorFont-200" />
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
  );
};

export default ActionsHeader;
