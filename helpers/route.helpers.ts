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

// Borrowed from the internet
type ExtractRouteParams<T> = string extends T
  ? Record<string, string>
  : T extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? { [k in Param | keyof ExtractRouteParams<Rest>]: string }
  : T extends `${infer _Start}:${infer Param}`
  ? { [k in Param]: string }
  : object;

const fillDynamicPath = <S extends string>(
  path: S,
  args: ExtractRouteParams<S>
) => {
  const parts = path.split("/");
  parts.forEach((p, i) => {
    if (p.startsWith(":")) {
      const key = p.slice(1);
      // @ts-expect-error key is a valid key of args
      parts[i] = args[key];
    }
  });
  return parts.join("/");
};

export { getServerActionPathname, returnWithSearchParams, fillDynamicPath };
