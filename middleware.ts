export { default } from "next-auth/middleware"
console.log("middleware.ts")
export const config = { matcher: ["/dd"] }
