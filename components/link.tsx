import NextLink from "next/link";
import { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof NextLink>;

const Link: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <NextLink {...props} className="text-blue-600">
      {children}
    </NextLink>
  );
};

export { Link };
