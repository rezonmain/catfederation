import { Link } from "@/components/link";
import { getApplicationById } from "@/repositories/applications.repository";
import { OAuth2AuthorizeParams } from "@/types/oath2.type";

type OAuth2AuthorizePageSearchParams = OAuth2AuthorizeParams;

export default async function OAuth2AuthorizePage({
  searchParams,
}: {
  searchParams: OAuth2AuthorizePageSearchParams;
}) {
  const { applicationId, redirectUri } = searchParams;
  const application = await getApplicationById({ applicationId });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <small>The external application</small>
      <h1>{application.name}</h1>
      <small>Wants to access your catfederation account</small>
      <hr />
      <small>
        By pressing the authorize button you will grant access to{" "}
        {application.name} the following:
      </small>
      <ul>
        <li>Your username and user ID</li>
      </ul>
      <hr />
      <p>
        <small>
          Once you authorize the application you will be redirected to{" "}
          <code>{redirectUri}</code>
        </small>
      </p>
      <Link href={redirectUri}>Cancel</Link>
      <form>
        <button>Authorize</button>
      </form>
    </main>
  );
}
