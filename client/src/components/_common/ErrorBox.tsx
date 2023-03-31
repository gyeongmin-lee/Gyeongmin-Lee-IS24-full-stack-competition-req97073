import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

interface Props {
  /**
   * Title of the error box.
   */
  title: string;
  /**
   * Description of the error box.
   */
  description: string;
}

/**
 * `ErrorBox` is a component that renders an error box.
 */
const ErrorBox = ({ title, description }: Props) => {
  return (
    <Alert
      status="error"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      paddingY={10}
      borderRadius={5}
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {title}
      </AlertTitle>
      <AlertDescription maxWidth="sm">{description}</AlertDescription>
    </Alert>
  );
};

export default ErrorBox;
