import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Container,
  Flex,
  Heading,
  Skeleton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import productService from "../services/products";
import { Filter } from "../types";
import ProductListing from "./ProductListing";
import ProductSearchForm from "./_common/ProductSearchForm";

const Products = () => {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery("products", productService.getAll);

  const [filter, setFilter] = useState<Filter>(Filter.SCRUM_MASTER);
  const [query, setQuery] = useState<string>("");

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
    <Container maxW="container.xl" padding={5} mb="16">
      <VStack spacing={3} alignItems="flex-start">
        <Heading size="lg">Products</Heading>
        <Flex
          gap={[2, 4]}
          flexDir={["column-reverse", "row"]}
          justifyContent="flex-start"
          w="full"
          alignItems={["flex-start", "center"]}
        >
          <ProductSearchForm
            filter={filter}
            query={query}
            onFilterChange={setFilter}
            onQueryChange={setQuery}
          />
          {products && (
            <Text fontSize="md" flexShrink="0">
              {products.length} Products
            </Text>
          )}
        </Flex>
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
