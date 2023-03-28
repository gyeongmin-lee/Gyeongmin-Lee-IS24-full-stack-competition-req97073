import { Container } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Products from "./components/Products";

function App() {
  return (
    <Container padding={0} maxW="full">
      <Navbar />
      <Products />
    </Container>
  );
}

export default App;
