"use server";
import { ROUTE_USER } from "@/constants/route.constants";
import { redirect } from "next/navigation";
import { z } from "zod";

const registerNewApplicationSchema = z.object({
  name: z.string(),
});

async function handleRegisterApplication(formData: FormData) {
  const fields = registerNewApplicationSchema.safeParse({
    name: formData.get("name"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  console.log(fields.data);
  redirect(ROUTE_USER);
}

export { handleRegisterApplication };
