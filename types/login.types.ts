import { type z } from "zod";
import { LOGIN_SCHEMA } from "@/constants/login.constants";

type LoginSchema = z.infer<typeof LOGIN_SCHEMA>;

export type { LoginSchema };
