import NextLink from "next/link";
import { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof NextLink>;

const Link: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <NextLink
      {...props}
      className="underline underline-offset-4 font-medium hover:no-underline"
    >
      {children}
    </NextLink>
  );
};

export { Link };
