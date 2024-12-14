import NextAuth, {getServerSession, NextAuthOptions} from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {prisma} from "@/prisma/prisma"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const githubId = process.env.GITHUB_ID;
const githubSecret = process.env.GITHUB_SECRET;
const googleId = process.env.GOOGLE_ID;
const googleSecret = process.env.GOOGLE_SECRET;

if (typeof githubId === "undefined" || typeof githubSecret === "undefined" || typeof googleId === "undefined" || typeof googleSecret === "undefined") {
  
  throw new Error(
    `Missing GITHUB_ID, GITHUB_SECRET, GOOGLE_ID or GOOGLE_SECRET environment variables`
  );
}

const authOptions: NextAuthOptions = {
    providers: [
      GithubProvider({
        clientId: githubId,
        clientSecret: githubSecret,
      }),
      GoogleProvider({
        clientId: googleId,
        clientSecret: googleSecret,
      })
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
