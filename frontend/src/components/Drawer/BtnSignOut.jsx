import { signOut } from "next-auth/react"
import LogoutIcon from '@mui/icons-material/Logout';

const BtnSignOut = () => {
  return (
    <button 
      onClick={() => signOut()}
      className="flex items-center w-full px-0 py-0 hover:bg-gray-100 active:bg-gray-100 rounded-full transition duration-500 ease-out"
    >
      <span><LogoutIcon fontSize="small" className="mr-2"></LogoutIcon></span>
      <span className="text-sm text-neutral-800 font-medium">Sair</span>
    </button>
  )
}

export default BtnSignOut