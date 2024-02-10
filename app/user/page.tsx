import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { Link } from "@/components/link";
import { UserPreferenceForm } from "@/components/user-preference-form";
import {
  ROUTE_DEVELOPER,
  ROUTE_SIGNUP_FINISH,
} from "@/constants/route.constants";
import { userPreferences } from "@/helpers/preference.helpers";
import { auth } from "@/helpers/session.helpers";
import { handleUserPreferences } from "./action";
import { isPlaceholderUsername } from "@/helpers/users.helpers";

export const metadata: Metadata = {
  title: "catfederation",
  description: "user settings",
};

export default function UserPage() {
  const user = auth();

  if (isPlaceholderUsername(user.username)) {
    redirect(ROUTE_SIGNUP_FINISH);
  }

  const preferences = userPreferences();

  return (
    <main className="flex flex-col gap-6 p-24">
      <h1>Hi there {user.username}</h1>
      {preferences.isDeveloper && (
        <Link href={ROUTE_DEVELOPER}>Go to developer dashboard</Link>
      )}
      <section>
        <UserPreferenceForm
          action={handleUserPreferences}
          defaultValues={preferences}
        />
      </section>
    </main>
  );
}
