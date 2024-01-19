import { ClipboardButton } from "@/components/clipboard-button";

type ApplicationExampleUrlFieldProps = {
  url: string;
};

const ApplicationExampleUrlField: React.FC<ApplicationExampleUrlFieldProps> = ({
  url,
}) => (
  <details className="flex cursor-pointer flex-col">
    <summary className="uppercase tracking-wider">
      Example authorization URL
    </summary>
    <label className="flex cursor-pointer flex-row items-center justify-between rounded-lg border px-4 py-2">
      <code className="text-sm">{url}</code>
      <ClipboardButton text={url} toastMessage="URL copied to clipboard!" />
    </label>
  </details>
);

export { ApplicationExampleUrlField };
