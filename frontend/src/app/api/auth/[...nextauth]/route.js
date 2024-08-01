import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";

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

      async authorize(credentials, req){
        try {
          const response = await fetch("https://erp-mkt.vercel.app/api/auth/login", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          })
      
          const user = await response.json()
      
          if (response.ok && user) {
            console.log('User:', user)
            return user
          } 
        } catch (error) {
          console.error('Next-Auth:', error)
        }
      },
    }),
  ],

  pages: {
    signIn: '/login',
  },

  callbacks: {
    session: async (session, user) => {
      if(user) {
        return Promise.resolve(session)
      } else {
        return Promise.resolve({
          redirect: '/login'
        })
      }
    }
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }