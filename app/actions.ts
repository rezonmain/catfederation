"use server";
import { redirect } from "next/navigation";
import { deleteSessionCookies } from "@/helpers/session.helpers";
import { ROUTE_LOGIN } from "@/constants/route.constants";

const handleLogout = () => {
  deleteSessionCookies();
  redirect(ROUTE_LOGIN);
};

export { handleLogout };
