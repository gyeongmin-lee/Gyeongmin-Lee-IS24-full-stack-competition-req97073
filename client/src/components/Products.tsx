import { Container, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useDebounce } from "use-debounce";
import productService from "../services/products";
import { Filter } from "../types";
import ProductListing from "./ProductListing";
import ErrorBox from "./_common/ErrorBox";
import ProductSearchForm from "./_common/ProductSearchForm";
import TableLoadingSkeleton from "./_common/TableLoadingSkeleton";

/**
 * `Products` component is responsible for fetching and displaying the list of
 * products.
 */
const Products = () => {
  const [filter, setFilter] = useState<Filter>(Filter.SCRUM_MASTER);
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(query, 500);

  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["products", filter, debouncedQuery], () =>
    productService.getAll({ type: filter, query: debouncedQuery })
  );

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
          <TableLoadingSkeleton skeletonCount={3} />
        ) : error ? (
          <ErrorBox
            title="Failed to load products"
            description="Sorry, we had some trouble loading the products. Please try again later."
          />
        ) : (
          <ProductListing products={products} />
        )}
      </VStack>
    </Container>
  );
};

export default Products;
