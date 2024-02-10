"use client";
import { useFormState } from "react-dom";
import { Input } from "@/components/ui/input";
import { empty } from "@/helpers/utils.helpers";
import { FieldMessage } from "./field-message";
import { SubmitButton } from "./submit-button";
import { handleUpdateUsername } from "@/app/signup/finish/action";
import {
  USERS_USERNAME_INPUT_PATTERN,
  USERS_USERNAME_MAX_LENGTH,
  USERS_USERNAME_MIN_LENGTH,
} from "@/constants/users.constants";

type UsersUpdateUsernameFormProps = {
  userId: string;
};

const UsersUpdateUsernameForm: React.FC<UsersUpdateUsernameFormProps> = ({
  userId,
}: UsersUpdateUsernameFormProps) => {
  const [{ errors }, formAction] = useFormState(handleUpdateUsername, {
    errors: {},
  });

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="userId" value={userId} />
      <span>Choose your username</span>
      <label className="flex flex-col gap-2">
        <Input
          name="uname"
          type="text"
          pattern={USERS_USERNAME_INPUT_PATTERN}
          title="Username must not contain spaces or special characters"
          minLength={USERS_USERNAME_MIN_LENGTH}
          maxLength={USERS_USERNAME_MAX_LENGTH}
        />
        {empty(errors.username) ? null : (
          <FieldMessage message={errors.username} />
        )}
      </label>
      <SubmitButton>Confirm</SubmitButton>
    </form>
  );
};

export { UsersUpdateUsernameForm };
