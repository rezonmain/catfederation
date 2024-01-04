import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { nil } from "@/helpers/utils.helpers";

const getServerActionPathname = () => {
  const heads = headers();
  const url = heads.get("Referer");
  if (nil(url)) {
    throw new Error("No referer header found");
  }
  const urlObj = new URL(url);
  return urlObj.pathname;
};

/**
 * Redirect to the current page with the given search params
 * @param params
 */
const returnWithSearchParams = <
  T extends
    | string
    | string[][]
    | Record<string, string>
    | URLSearchParams
    | undefined
>(
  params: T
) => {
  const redirectUrl = `${getServerActionPathname()}?${new URLSearchParams(
    params
  ).toString()}`;
  redirect(redirectUrl);
};

export { getServerActionPathname, returnWithSearchParams };
