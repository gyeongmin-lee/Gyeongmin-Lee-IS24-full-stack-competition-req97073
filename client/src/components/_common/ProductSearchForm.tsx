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
  filter: Filter;
  query: string;
  onFilterChange: (value: Filter) => void;
  onQueryChange: (value: string) => void;
}

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
        <option value={Filter.ScrumMaster}>Scrum Master</option>
        <option value={Filter.Developer}>Developer</option>
      </Select>
      <InputGroup>
        <Input
          placeholder={`Search projects by ${
            filter === Filter.ScrumMaster ? "scrum master" : "developer"
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
