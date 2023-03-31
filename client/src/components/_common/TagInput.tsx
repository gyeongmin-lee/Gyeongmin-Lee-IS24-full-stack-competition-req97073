import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Tag,
  TagCloseButton,
  TagLabel,
  VStack,
} from "@chakra-ui/react";
import React, { HTMLAttributes, KeyboardEvent, useRef } from "react";

interface Props extends Omit<HTMLAttributes<HTMLInputElement>, "onChange"> {
  /**
   * Function that is called when the value of the input field changes.
   * @param value
   */
  onChange: (value: string[]) => void;
  /**
   * Array of strings that are displayed as `Tag` components.
   */
  value: string[];
  /**
   * Boolean that determines whether the input field is disabled.
   */
  isSubmitting: boolean;
}

/**
 * `TagInput` is a component that renders an input field that allows users to
 * add tags which are displayed as `Tag` components. The value is an array of
 * strings.
 */
const TagInput = ({ onChange, value, isSubmitting }: Props) => {
  const [inputValue, setInputValue] = React.useState<string>("");

  const ref = useRef<HTMLInputElement>(null);

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  const addTag = (tag: string) => {
    if (!tag) return;

    onChange([...new Set([...value, tag])]);
    setInputValue("");
    ref.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue) {
      addTag(inputValue);
      e.preventDefault();
    }

    if (e.key === "Backspace" && !inputValue) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <VStack alignItems="flex-start">
      {value.length > 0 && (
        <Flex flexWrap="wrap" gap={2}>
          {value.map((tag) => (
            <Tag maxW="max-content" key={tag} size="sm">
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => removeTag(tag)} />
            </Tag>
          ))}
        </Flex>
      )}
      <InputGroup>
        <Input
          mt={0}
          marginTop={0}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={ref}
        />
        {inputValue && (
          <InputRightElement width="5rem">
            <Button
              onClick={() => addTag(inputValue)}
              leftIcon={<AddIcon />}
              variant="subtle"
              isDisabled={isSubmitting}
              size="sm"
            >
              Add
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
    </VStack>
  );
};

export default TagInput;
