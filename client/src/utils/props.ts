import { UseToastOptions } from "@chakra-ui/react";

export const commonToastProps = {
  duration: 9000,
  variant: "subtle",
  position: "top",
  isClosable: true,
} satisfies UseToastOptions;
