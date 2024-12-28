import NextAuth, {getServerSession, NextAuthOptions} from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {prisma} from "@/prisma/prisma"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {verifyUserCredentials} from "@/utils/data";

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
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {label: "Email", type: "text", placeholder: "jsmith"},
        password: {label: "Password", type: "password"}
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials?.email || !credentials?.password) return null
        const user = await verifyUserCredentials(credentials.email, credentials.password)
        if (user) {
          return user
          // Any object returned will be saved in `user` property of the JWT
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
          
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({token, account, user}) {
      if (account) {
        token.accessToken = account.access_token
        token.userId = user?.id
      }
      return token
    },
    async session({session, token}) {
      if (typeof token.accessToken === "string") {
        session.accessToken = token.accessToken
      }
      if (typeof token.userId === "string") {
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
