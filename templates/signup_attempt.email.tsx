import { Html, Button, Heading, Text } from "@react-email/components";
import { render } from "@react-email/render";

type SignupAttemptTemplateProps = {
  url: string;
};

const SignupAttemptTemplate: React.FC<SignupAttemptTemplateProps> = (props) => {
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

const renderSignupAttemptTemplate = (url: string) => {
  return render(<SignupAttemptTemplate url={url} />);
};
export { renderSignupAttemptTemplate };
