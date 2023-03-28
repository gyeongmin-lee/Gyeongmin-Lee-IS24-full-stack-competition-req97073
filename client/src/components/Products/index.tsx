import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Container,
  Heading,
  HStack,
  Skeleton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import productService from "../../services/products";
import ProductListing from "./ProductListing";

const Products = () => {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery("products", productService.getAll);

  const showLoading = () => (
    <Stack w="100%">
      <Skeleton height={10} />
      <Skeleton height={10} />
      <Skeleton height={10} />
    </Stack>
  );

  const showError = () => {
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
          Failed to load products
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Sorry, we had some trouble loading the products. Please try again
          later.
        </AlertDescription>
      </Alert>
    );
  };

  return (
    <Container maxW="container.xl" padding={5}>
      <VStack spacing={3} alignItems="flex-start">
        <HStack justifyContent="space-between" w="full" alignItems="flex-end">
          <Heading size="lg">Products</Heading>
          {products && <Text>{products.length} Products</Text>}
        </HStack>
        {isLoading || !products ? (
          showLoading()
        ) : error ? (
          showError()
        ) : (
          <ProductListing products={products} />
        )}
      </VStack>
    </Container>
  );
};

export default Products;
