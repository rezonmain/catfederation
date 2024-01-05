import NextLink from "next/link";
import { handleLogout } from "actions";
import { ROUTE_USER } from "@/constants/route.constants";
import { LogoutButton } from "./logout-button";

const Navbar: React.FC = () => {
  return (
    <nav className="flex flex-row justify-between items-center px-12 py-3 border-b border-b-border">
      <NextLink href={ROUTE_USER}>
        <h1 className="text-2xl font-bold uppercase tracking-widest">
          catfederation
        </h1>
      </NextLink>
      <div className="flex flex-row gap-4">
        <LogoutButton action={handleLogout} />
      </div>
    </nav>
  );
};

export { Navbar };
