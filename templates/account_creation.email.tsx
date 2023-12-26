import { Html, Button, Heading, Text } from "@react-email/components";
import { render } from "@react-email/render";

type AccountCreationTemplateProps = {
  url: string;
};

const AccountCreationTemplate: React.FC<AccountCreationTemplateProps> = (
  props
) => {
  return (
    <Html lang="en" dir="ltr">
      <Heading as="h1">cat_federation account creation</Heading>
      <Text>
        You have requested to create a cat_federation account with this email
        address.
      </Text>
      <Button href={props.url} style={{ color: "#61dafb" }}>
        Click here to continue with account creation
      </Button>
    </Html>
  );
};

const renderAccountCreationTemplate = (url: string) => {
  return render(<AccountCreationTemplate url={url} />);
};
export { renderAccountCreationTemplate };
