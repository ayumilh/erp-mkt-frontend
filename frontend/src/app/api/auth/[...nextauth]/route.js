import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import Cookies from "js-cookie";
import axios from 'axios';

let tempPassword = '';

const nextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "senha", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const response = await fetch("https://erp-mkt.vercel.app/api/auth/login", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          });
          const user = await response.json();
          if (response.ok && user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        tempPassword = generateRandomPassword();
        const inputs = {
          email: user.email,
          senha: tempPassword
        };

        try {
          await axios.post("https://erp-mkt.vercel.app/api/auth/register", inputs);
        } catch (registerError) {
          if (registerError.response && registerError.response.status !== 409) {
            console.error('Erro ao registrar o usuário:', registerError);
          }
        }

        try {
          const loginResponse = await axios.post("https://erp-mkt.vercel.app/api/auth/login", true, { withCredentials: true });
          Cookies.set('userId', JSON.stringify(loginResponse.data));
        } catch (loginError) {
          console.error('Erro ao fazer login:', loginError);
          return false;
        }
      }

      return true;
    },

    async session({ session, token }) {
      if (token && token.provider === 'google') {
        session.user.password = tempPassword;
      }
      return session;
    },
  },
};

function generateRandomPassword() {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
}

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };