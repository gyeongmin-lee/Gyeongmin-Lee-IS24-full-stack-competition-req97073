import { SearchIcon } from "@chakra-ui/icons";
import {
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import React from "react";
import { Filter } from "../../types";

interface Props {
  /**
   * Value of the filter select.
   */
  filter: Filter;
  /**
   * Value of the search input.
   */
  query: string;
  /**
   * Function that is called when the value of the filter select changes.
   */
  onFilterChange: (value: Filter) => void;
  /**
   * Function that is called when the value of the search input changes.
   */
  onQueryChange: (value: string) => void;
}

/**
 * `ProductSearchForm` is a component that renders a form that allows users to
 * search for products by columns.
 */
const ProductSearchForm: React.FC<Props> = ({
  filter,
  query,
  onFilterChange,
  onQueryChange,
}) => {
  return (
    <HStack flex={1}>
      <Select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value as Filter)}
        maxW="max-content"
      >
        <option value={Filter.SCRUM_MASTER}>Scrum Master</option>
        <option value={Filter.DEVELOPER}>Developer</option>
      </Select>
      <InputGroup>
        <Input
          placeholder={`Search projects by ${
            filter === Filter.SCRUM_MASTER ? "scrum master" : "developer"
          } name`}
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        <InputRightElement children={<SearchIcon />} />
      </InputGroup>
    </HStack>
  );
};

export default ProductSearchForm;
