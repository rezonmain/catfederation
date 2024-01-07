import { Link } from "@/components/link";
import { UserPreferenceForm } from "@/components/user-preference-form";
import { ROUTE_DEVELOPER } from "@/constants/route.constants";
import { userPreferences } from "@/helpers/preference.helpers";
import { auth } from "@/helpers/session.helpers";
import { handleUserPreferences } from "./action";

export default function UserPage() {
  auth();
  const preferences = userPreferences();

  return (
    <main className="flex flex-col items-center gap-4 p-24">
      {preferences.alias ? (
        <h1>Hi {preferences.alias}!</h1>
      ) : (
        <h1>Hi there!</h1>
      )}
      {preferences.isDeveloper && (
        <Link href={ROUTE_DEVELOPER}>Go to developer dashboard</Link>
      )}
      <section className="max-w-md">
        <UserPreferenceForm
          action={handleUserPreferences}
          defaultValues={preferences}
        />
      </section>
    </main>
  );
}
