import { Html, Button, Heading, Text } from "@react-email/components";
import { render } from "@react-email/render";

type SignupConfirmTemplateProps = {
  url: string;
};

const SignupConfirmTemplate: React.FC<SignupConfirmTemplateProps> = (props) => {
  return (
    <Html lang="en" dir="ltr">
      <Heading as="h1">catfederation account creation</Heading>
      <Text>
        You have requested to create a catfederation account with this email
        address.
      </Text>
      <Button href={props.url} style={{ color: "#61dafb" }}>
        Click here to continue with account creation
      </Button>
    </Html>
  );
};

const renderSignupConfirmTemplate = (url: string) => {
  return render(<SignupConfirmTemplate url={url} />);
};
export { renderSignupConfirmTemplate };
