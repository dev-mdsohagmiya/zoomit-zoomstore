import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { getCredentialsActhorize } from "./auth/getCredentialsAuthorize";


export const { handlers, signIn, signOut, auth } = NextAuth({
  pages:{
    signIn:"/login",
    signOut:"/login",
    error:"/login"
  },
  providers: [Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),Github,Facebook,
  Credentials({
  credentials: {
    email: {
      type: "email",
      label: "Email",
      placeholder: "johndoe@gmail.com",
    },
    password: {
      type: "password",
      label: "Password",
      placeholder: "*****",
    },
  },
  authorize:async(credentials)=>{
           return credentials
  }
})
  ],
});
