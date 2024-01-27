"use client";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ROUTE_USER } from "@/constants/route.constants";
import { empty } from "@/helpers/utils.helpers";

type HyperspaceProps = {
  callback?: string;
};
const Hyperspace: React.FC<HyperspaceProps> = ({ callback }) => {
  useEffect(() => {
    if (empty(callback)) {
      redirect(ROUTE_USER);
    }

    redirect(callback);
  }, [callback]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <LoadingSpinner />
    </main>
  );
};

export { Hyperspace };
