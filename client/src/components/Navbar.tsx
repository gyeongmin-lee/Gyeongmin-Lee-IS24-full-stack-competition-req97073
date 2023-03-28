import { Box, Heading, HStack, Link } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <HStack
      bgColor="brand1"
      borderBottom={"2px solid red"}
      borderBottomColor="brand2"
      justifyContent="center"
    >
      <Box maxW="container.xl" w="100%" paddingX={5} paddingY={3}>
        <Heading size="xl" color="white">
          <Link href="/">IS24 Application</Link>
        </Heading>
      </Box>
    </HStack>
  );
};

export default Navbar;
