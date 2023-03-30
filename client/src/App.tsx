import { Container } from "@chakra-ui/react";
import AddProduct from "./components/AddProduct";
import Navbar from "./components/Navbar";
import Products from "./components/Products";

function App() {
  return (
    <Container padding={0} maxW="full">
      <Navbar />
      <Products />
      <AddProduct />
    </Container>
  );
}

export default App;
