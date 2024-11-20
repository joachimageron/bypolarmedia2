import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma/prisma"
import GithubProvider from "next-auth/providers/github";

const client_id = process.env.GITHUB_ID;
const client_secret = process.env.GITHUB_SECRET;
if (!client_id || !client_secret) {
  throw new Error(
    "Missing GITHUB_ID and GITHUB_SECRET environment variables"
  );
}

export const nextAuth = NextAuth({
  adapter: PrismaAdapter(prisma),
  // session: {
  //   // Choose how you want to save the user session.
  //   // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
  //   // If you use an `adapter` however, we default it to `"database"` instead.
  //   // You can still force a JWT session by explicitly defining `"jwt"`.
  //   // When using `"database"`, the session cookie will only contain a `sessionToken` value,
  //   // which is used to look up the session in the database.
  //   strategy: "jwt"
  // },
  providers: [
    GithubProvider({
      clientId: client_id,
      clientSecret: client_secret,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/profil' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  secret: process.env.NEXTAUTH_SECRET,
})
