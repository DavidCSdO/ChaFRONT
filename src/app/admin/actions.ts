"use server";

import { cookies } from "next/headers";

export async function loginAction(password: string) {
  if (password === "195090") {
    // Next.js 15 requires awaiting cookies()
    const cookieStore = await cookies();
    cookieStore.set("admin_auth", password, { 
      path: "/", 
      secure: process.env.NODE_ENV === "production", 
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30 // 30 days
    });
    return { success: true };
  }
  return { success: false };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_auth");
}
