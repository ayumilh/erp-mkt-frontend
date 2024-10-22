import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

export const searchUserId = () => {
    const tokenId = Cookies.get("userId") ? JSON.parse(Cookies.get("userId")) : null;
    if (tokenId && tokenId.token) {
        try {
            const decodedToken = jwtDecode(tokenId.token);
            const userId = decodedToken.userid;
            return userId;
        } catch (error) {
            console.error(error);
            return;
        }
    } else {
        return;
    }
}