import { Link } from "./link";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col px-12 border-t border-t-border py-8">
      <small className="text-muted-foreground">
        Made with 💝 by{" "}
        <Link href="https://rezonmain.dev" target="blank" rel="noreferrer">
          rezonmain
        </Link>
      </small>
    </footer>
  );
};

export { Footer };
