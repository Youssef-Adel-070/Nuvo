"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export default async function getUserToken() {
  const cookieStore = await cookies();

  const sessionCookie =
    cookieStore.get("__Secure-next-auth.session-token")?.value ??
    cookieStore.get("next-auth.session-token")?.value;

  if (!sessionCookie) {
    throw new Error("NextAuth session cookie not found");
  }

  const decodedToken = await decode({
    token: sessionCookie,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const apiToken = decodedToken?.token;

  if (typeof apiToken !== "string" || !apiToken) {
    throw new Error("API token not found in NextAuth session");
  }

  return apiToken;
}