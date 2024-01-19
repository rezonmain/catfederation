import { z } from "zod";

const LOGIN_SCHEMA = z.object({
  email: z.string().email({ message: "Please provide a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export { LOGIN_SCHEMA };
