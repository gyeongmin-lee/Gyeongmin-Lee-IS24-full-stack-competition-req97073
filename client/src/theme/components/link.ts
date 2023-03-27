import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const brandPrimary = defineStyle({
  textDecoration: "underline",
  color: "link",
  _hover: {
    textDecoration: "none",
    color: "blue",
  },
});

const linkTheme = defineStyleConfig({
  variants: { brandPrimary },
});

export default linkTheme;
