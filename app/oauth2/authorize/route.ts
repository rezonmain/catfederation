import { type NextRequest } from "next/server";
import { OAUTH2_AUTHORIZE_SCHEMA } from "@/constants/oauth2.constants";
import { getApplicationRedirects } from "@/repositories/applicationRedirects.repository";
import { empty } from "@/helpers/utils.helpers";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const params = OAUTH2_AUTHORIZE_SCHEMA.safeParse({
    responseType: query.get("responseType"),
    applicationId: query.get("applicationId"),
    redirectUri: query.get("redirectUri"),
    scope: query.get("scope"),
    state: query.get("state"),
  });

  if (!params.success) {
    return new Response(
      JSON.stringify({
        errors: params.error.flatten().fieldErrors,
      }),
      { status: 400 },
    );
  }

  const redirects = await getApplicationRedirects({
    applicationId: params.data.applicationId,
  });

  if (empty(redirects)) {
    return new Response("No redirects found for this application", {
      status: 400,
    });
  }

  const redirectToUse = redirects.find((redirect) => {
    return redirect.uri === params.data.redirectUri;
  });

  if (empty(redirectToUse)) {
    return new Response(
      "Provided redirectUri is not valid for this application",
      { status: 400 },
    );
  }

  return new Response(redirectToUse.uri);
}
