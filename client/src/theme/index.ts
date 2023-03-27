import { extendTheme, theme as base } from "@chakra-ui/react";
import colors from "./colors";
import Button from "./components/button";
import Link from "./components/link";
import styles from "./styles";

const theme = extendTheme({
  styles,
  colors,
  fonts: {
    heading: `BCSans, ${base.fonts?.heading}`,
    body: `BCSans, ${base.fonts?.body}`,
  },
  components: {
    Button,
    Link,
  },
});

export default theme;
