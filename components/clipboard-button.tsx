"use client";
import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

const SHOW_CONFIRM_TIMEOUT = 2000;

type ClipboardButtonProps = {
  text: string;
  toastMessage?: string;
};

const ClipboardButton: React.FC<ClipboardButtonProps> = ({
  text,
  toastMessage,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const onButtonClick = useCallback(() => {
    if (showConfirm) {
      return;
    }

    navigator.clipboard.writeText(text);

    setShowConfirm(true);

    setTimeout(() => {
      setShowConfirm(false);
    }, SHOW_CONFIRM_TIMEOUT);

    if (toastMessage) {
      toast(toastMessage);
    }
  }, [text, showConfirm, toastMessage]);

  return (
    <Button size="sm" onClick={onButtonClick} variant="ghost">
      {showConfirm ? (
        <Check className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
};

export { ClipboardButton };
