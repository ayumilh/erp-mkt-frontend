import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function checkSession() {
  const sessionCookie = cookies().get("better-auth.session_token");

  if (!sessionCookie) {
    redirect("/");
  }
}
