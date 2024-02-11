"use server";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  USERS_USERNAME_INPUT_PATTERN,
  USERS_USERNAME_MAX_LENGTH,
  USERS_USERNAME_MIN_LENGTH,
  USERS_USERNAME_VALIDATION_MESSAGE,
} from "@/constants/users.constants";
import { updateUserUsername } from "@/repositories/user.repository";
import { ROUTE_USER } from "@/constants/route.constants";
import { setNewSessionCookies } from "@/helpers/session.helpers";
import { User } from "@/db/schema";
import { generateRandomUsername } from "@/helpers/users.helpers";

const signupFinishSchema = z.object({
  userId: z.string(),
  username: z
    .string()
    .min(
      USERS_USERNAME_MIN_LENGTH,
      `Username must be at least ${USERS_USERNAME_MIN_LENGTH} characters`,
    )
    .max(
      USERS_USERNAME_MAX_LENGTH,
      `Username must be at most ${USERS_USERNAME_MAX_LENGTH} characters`,
    )
    .regex(
      new RegExp(USERS_USERNAME_INPUT_PATTERN),
      USERS_USERNAME_VALIDATION_MESSAGE,
    ),
});

async function handleGenerateRandomUsername(_: string) {
  return generateRandomUsername();
}

async function handleUpdateUsername(_: unknown, formData: FormData) {
  const fields = signupFinishSchema.safeParse({
    username: formData.get("uname")?.toString().trim(),
    userId: formData.get("userId"),
  });

  if (!fields.success) {
    return {
      errors: fields.error.flatten().fieldErrors,
    };
  }

  try {
    await updateUserUsername({
      id: fields.data.userId,
      username: fields.data.username,
    });

    setNewSessionCookies({
      username: fields.data.username,
      id: fields.data.userId,
    });
  } catch (e) {
    console.log(e);
    return {
      errors: {
        username: ["Username already taken"],
      },
    };
  }

  redirect(ROUTE_USER);
}
export { handleGenerateRandomUsername, handleUpdateUsername };
