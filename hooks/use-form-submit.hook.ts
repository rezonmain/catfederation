"use client";
import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { noop } from "@/helpers/utils.helpers";

const useFormSubmit = (onSubmitted: () => void = noop) => {
  const submitted = useRef<boolean | null>(null);
  const { pending, ...other } = useFormStatus();

  useEffect(() => {
    if (pending) {
      submitted.current = false;
      return;
    }

    if (!pending && submitted.current === false) {
      submitted.current = true;
      onSubmitted();
      return;
    }
  }, [pending, submitted, onSubmitted]);

  return {
    submitted,
    pending,
    other,
  };
};

export { useFormSubmit };
