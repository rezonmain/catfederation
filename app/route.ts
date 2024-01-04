import { ROUTE_LOGIN, ROUTE_USER } from "@/constants/route.constants";
import { auth } from "@/helpers/session.helpers";
import { nil } from "@/helpers/utils.helpers";
import { redirect } from "next/navigation";

export async function GET() {
  const { userId } = auth();
  if (nil(userId)) {
    redirect(ROUTE_LOGIN);
  }
  redirect(ROUTE_USER);
}
