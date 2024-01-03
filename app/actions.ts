"use server";
import { deleteSessionCookies, revokeSession } from "@/helpers/session.helpers";
import { redirect } from "next/navigation";

const handleLogout = () => {
  revokeSession();
  // deleteSessionCookies();
  redirect("/");
};

export { handleLogout };
