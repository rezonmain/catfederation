"use client";
import { useState } from "react";
import { useFormState } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { empty } from "@/helpers/utils.helpers";
import { FieldMessage } from "./field-message";
import { SubmitButton } from "./submit-button";
import { handleUpdateUsername } from "@/app/signup/finish/action";
import {
  USERS_USERNAME_INPUT_PATTERN,
  USERS_USERNAME_MAX_LENGTH,
  USERS_USERNAME_MIN_LENGTH,
} from "@/constants/users.constants";
import { generateRandomUsername } from "@/helpers/users.helpers";

type UsersUpdateUsernameFormProps = {
  userId: string;
};

const UsersUpdateUsernameForm: React.FC<UsersUpdateUsernameFormProps> = ({
  userId,
}: UsersUpdateUsernameFormProps) => {
  const [uname, setUname] = useState("");
  const [{ errors }, formAction] = useFormState(handleUpdateUsername, {
    errors: {},
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUname(e.target.value);
  };

  const handleRandom = () => {
    setUname(generateRandomUsername());
  };

  return (
    <>
      <form action={formAction} className="flex flex-col gap-4">
        <input type="hidden" name="userId" value={userId} />
        <span>Choose your username</span>
        <label className="flex flex-col gap-2">
          <Input
            value={uname}
            onChange={handleChange}
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
      <Button variant="link" className="self-start pl-0" onClick={handleRandom}>
        Choose a random username
      </Button>
    </>
  );
};

export { UsersUpdateUsernameForm };
