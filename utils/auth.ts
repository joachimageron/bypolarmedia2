import NextAuth, {getServerSession, NextAuthOptions} from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {prisma} from "@/prisma/prisma"
import GithubProvider from "next-auth/providers/github";

const githubId = process.env.GITHUB_ID;
const githubSecret = process.env.GITHUB_SECRET;
if (typeof githubId === "undefined" || typeof githubSecret === "undefined") {
  
  throw new Error(
    `Missing GITHUB_ID and GITHUB_SECRET environment variables ${githubId} ${githubSecret}`
  );
}

const authOptions: NextAuthOptions = {
    providers: [
      GithubProvider({
        clientId: githubId,
        clientSecret: githubSecret,
      }),
    ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token
        token.userId = user?.id
      }
      return token
    },
    async session({ session, token }) {
      
      if (typeof token.accessToken === "string" && typeof token.userId === "string") {
        session.accessToken = token.accessToken
        session.user.userId = token.userId
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/profil' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const nextAuth = NextAuth(authOptions)

export async function serverSession() {
  return getServerSession(authOptions)
}
