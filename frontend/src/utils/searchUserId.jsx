import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

export function searchUserId() {
  // 1️⃣ Tenta ler o cookie de sessão do Better Auth
  const sessionToken = Cookies.get('better-auth.session_token')
  if (!sessionToken) return

  try {
    // 2️⃣ Decodifica o JWT
    const decoded = jwtDecode(sessionToken)

    // 3️⃣ Extrai user.id ou, em último caso, o padrão sub
    const userId = (decoded.user && decoded.user.id) || decoded.sub
    return userId
  } catch (err) {
    console.error('Erro ao decodificar o token de sessão:', err)
    return
  }
}
