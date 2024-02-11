"use server";
import { redirect } from "next/navigation";
import { generateAuthorizationCode } from "@/helpers/code.helpers";
import { pwq } from "@/helpers/route.helpers";
import { createCode } from "@/repositories/codes.repository";
import { type OAuth2AuthorizeParams } from "@/types/oath2.type";

async function handleAuthorizeApplication(
  authorizeParams: OAuth2AuthorizeParams,
) {
  const { applicationId, redirectUri } = authorizeParams;
  const authorizationCode = generateAuthorizationCode(authorizeParams);
  await createCode({
    applicationId,
    redirectUri,
    code: authorizationCode,
  });

  redirect(pwq(redirectUri, { code: authorizationCode }));
}

export { handleAuthorizeApplication };
