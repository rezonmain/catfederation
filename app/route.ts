import { redirect } from "next/navigation";
import { ROUTE_USER } from "@/constants/route.constants";

export async function GET() {
  redirect(ROUTE_USER);
}
