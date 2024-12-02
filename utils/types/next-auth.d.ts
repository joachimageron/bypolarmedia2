// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, {DefaultSession} from "next-auth"


declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string |  null
    user: {
      /** The user's postal address. */
      userId: string
    } & DefaultSession['user']
  }
  
  interface Token {
    accessToken: string | null
    userId: string | null
  }
}