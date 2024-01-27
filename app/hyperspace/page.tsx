import { type Metadata } from "next/types";
import { Hyperspace } from "@/components/hyperspace";

export const metadata: Metadata = {
  title: "Jumping to another location...",
  description: "Jumping to another location...",
};

type HyperspacePageSearchParams = {
  callback?: string;
};

export default function HyperspacePage({
  searchParams,
}: {
  searchParams: HyperspacePageSearchParams;
}) {
  const { callback } = searchParams;

  return <Hyperspace callback={callback} />;
}
