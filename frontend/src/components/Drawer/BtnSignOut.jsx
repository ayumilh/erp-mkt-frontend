import { signOut } from "next-auth/react"
import LogoutIcon from '@mui/icons-material/Logout';

const BtnSignOut = () => {
  return (
    <button 
      onClick={() => signOut()}
      className="flex w-full px-0 py-0 text-sm hover:bg-gray-100"
    >
      <span><LogoutIcon className="h-4 w-4 mr-2"></LogoutIcon></span>
      <span>Sair</span>
    </button>
  )
}

export default BtnSignOut