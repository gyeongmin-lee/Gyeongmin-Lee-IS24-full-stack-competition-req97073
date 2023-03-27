import {
  Button,
  ButtonGroup,
  Container,
  Heading,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";

function App() {
  return (
    <Container maxW="container.xl" p={10}>
      <VStack spacing={3} alignItems="flex-start">
        <Heading size="2xl">Title</Heading>
        <Text>Body</Text>
        <ButtonGroup>
          <Button>Hello!</Button>
          <Button variant="outline">Hello!</Button>
        </ButtonGroup>
        <Link variant="brandPrimary">Hi</Link>
      </VStack>
    </Container>
  );
}

export default App;
