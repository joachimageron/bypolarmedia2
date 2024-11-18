// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const client_id = process.env.GITHUB_ID;
const client_secret = process.env.GITHUB_SECRET;
if (!client_id || !client_secret) {
  throw new Error(
    "Missing GITHUB_ID and GITHUB_SECRET environment variables"
  );
}

const handler = NextAuth({
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
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };


























