import { Link } from "./link";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col border-t border-t-border px-12 py-8">
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
