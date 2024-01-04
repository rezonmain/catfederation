import { SubmitButton } from "./submit-button";

type LogoutButtonProps = {
  action: () => void;
};

const LogoutButton: React.FC<LogoutButtonProps> = ({ action }) => {
  return (
    <form action={action}>
      <SubmitButton>Logout</SubmitButton>
    </form>
  );
};

export { LogoutButton };
