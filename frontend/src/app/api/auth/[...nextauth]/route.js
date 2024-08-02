import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
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
            console.log('User:', user);
            return user;
          }
        } catch (error) {
          console.error('Next-Auth:', error);
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        tempPassword = generateRandomPassword();
        const inputs = {
          email: user.email,
          senha: tempPassword
        };
        console.log('User:', inputs);
        try {
          const response = await axios.post("https://erp-mkt.vercel.app/api/auth/register", inputs);
          if (response.status === 200) {
            console.log('User registered:', response.data);
          }
        } catch (error) {
          console.error('Registration error:', error);
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