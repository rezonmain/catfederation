"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { UserPreferences } from "@/types/preference.types";
import {
  PREFERENCES_SCHEMA,
  PREFERENCE_ALIAS_MAX_LENGTH,
  PREFERENCE_ALIAS_MIN_LENGTH,
} from "@/constants/preference.constants";
import { Input } from "./ui/input";
import { SubmitButton } from "./submit-button";
import { useCallback } from "react";
import { booleanString } from "@/helpers/utils.helpers";
import { toast } from "sonner";

type UserPreferenceFormProps = {
  action: (data: FormData) => Promise<unknown>;
  defaultValues: UserPreferences;
};

const handleUserPreferencesFormSubmit = async (
  data: UserPreferences,
  action: UserPreferenceFormProps["action"]
) => {
  const formData = new FormData();
  formData.append("alias", data.alias);
  formData.append("isDeveloper", booleanString(data.isDeveloper));
  await action(formData);
};

const UserPreferenceForm: React.FC<UserPreferenceFormProps> = ({
  action,
  defaultValues,
}) => {
  const form = useForm<UserPreferences>({
    resolver: zodResolver(PREFERENCES_SCHEMA),
    defaultValues,
  });

  const onSubmit = useCallback(
    async (data: UserPreferences) => {
      await handleUserPreferencesFormSubmit(data, action);
      toast.success("Preferences saved!");
    },
    [action]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4 items-start"
      >
        <h1 className="text-lg font-medium">User preferences</h1>
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="alias"
            render={({ field }) => (
              <label className="text-base flex flex-row items-center justify-between gap-10 rounded-lg border p-4">
                <div>
                  <p>Alias</p>
                  <FormDescription>
                    This is saved locally in browser.
                  </FormDescription>
                </div>
                <FormControl>
                  <Input
                    min={PREFERENCE_ALIAS_MIN_LENGTH}
                    max={PREFERENCE_ALIAS_MAX_LENGTH}
                    value={field.value}
                    placeholder="Your alias"
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </label>
            )}
          />

          <FormField
            control={form.control}
            name="isDeveloper"
            render={({ field }) => (
              <label className="text-base flex flex-row items-center justify-between gap-16 rounded-lg border p-4 cursor-pointer">
                <div>
                  <p>I&apos;m a developer</p>
                  <FormDescription>Toggle developer mode.</FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </label>
            )}
          />
        </div>
        <SubmitButton disabled={!form.formState.isDirty}>
          Save preferences
        </SubmitButton>
      </form>
    </Form>
  );
};

export { UserPreferenceForm };
