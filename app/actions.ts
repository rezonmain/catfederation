"use server";
import { redirect } from "next/navigation";
import { deleteSessionCookies } from "@/helpers/session.helpers";

const handleLogout = () => {
  deleteSessionCookies();
  redirect("/");
};

export { handleLogout };
