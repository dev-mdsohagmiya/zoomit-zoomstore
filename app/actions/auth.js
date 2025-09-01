"use server";

import { auth, signIn, signOut } from "../../auth.js";

export const doSignIn = async ({ provider }) => {
  await signIn(provider, {
    redirectTo: "/dashboard",
    callbackUrl: "http://localhost:3000",
  });
};

export const getSession = async () => {
  const session = await auth();
  return session;
};

export const doSignOut = async () => {
  await signOut();
};


export const signInWithCredentials = async(formData)=>{
 const user = formData
 console.log(user)
   await signIn("credentials",formData, {
    redirectTo: "/dashboard",
    callbackUrl: "http://localhost:3000",
  });


}