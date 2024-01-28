import { Routes } from "@/constants/routes.enum";

type ServerAction<T = unknown> = (...args: any) => Promise<T>;
type AppRoute = (typeof Routes)[keyof typeof Routes];

export type { ServerAction, AppRoute };
