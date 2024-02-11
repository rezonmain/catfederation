import { Link } from "@/components/link";
import { SubmitButton } from "@/components/submit-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/helpers/ui/avatar.helpers";
import { empty } from "@/helpers/utils.helpers";
import { getApplicationById } from "@/repositories/applications.repository";
import { OAuth2AuthorizeParams } from "@/types/oath2.type";
import { handleAuthorizeApplication } from "./action";

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
      <div className="flex max-w-lg flex-col gap-3 rounded-lg border p-6">
        <h1 className="text-2xl font-bold">Authorize application</h1>
        <p className="text-sm text-muted-foreground">
          The following application wants access to your catfederation account
        </p>
        <Separator />
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>{getInitials(application.name)}</AvatarFallback>
            </Avatar>
            <p className="text-lg">{application.name}</p>
          </div>
          {empty(application.description) ? null : (
            <p className="text-sm italic">
              &quot;{application.description}&quot;
            </p>
          )}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            By pressing the authorize button you grant access to:
          </p>
        </div>
        <ul className="list-disc px-4 text-sm">
          <li>Your username and user ID</li>
        </ul>
        <Separator />
        <div className="flex flex-col gap-2 text-muted-foreground">
          <small>Once you authorize you will be redirected to:</small>
          <small>
            <code>{redirectUri}</code>
          </small>
        </div>
        <form
          action={handleAuthorizeApplication.bind(null, searchParams)}
          className="flex flex-row items-center gap-4"
        >
          <SubmitButton>Authorize</SubmitButton>
          <Link href={redirectUri}>Cancel</Link>
        </form>
      </div>
    </main>
  );
}
