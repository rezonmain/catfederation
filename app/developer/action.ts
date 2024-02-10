"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ROUTE_DEVELOPER_APPLICATION } from "@/constants/route.constants";
import { auth } from "@/helpers/session.helpers";
import { createApplication } from "@/repositories/applications.repository";
import { fillDynamicPath } from "@/helpers/route.helpers";

const registerNewApplicationSchema = z.object({
  name: z.string(),
});

async function handleRegisterApplication(formData: FormData) {
  const { id: userId } = auth();

  const fields = registerNewApplicationSchema.safeParse({
    name: formData.get("name"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  const applicationId = await createApplication({
    name: fields.data.name,
    userId,
  });

  redirect(fillDynamicPath(ROUTE_DEVELOPER_APPLICATION, { applicationId }));
}

export { handleRegisterApplication };
