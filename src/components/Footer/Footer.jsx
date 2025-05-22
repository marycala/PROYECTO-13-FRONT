import React from "react";
import { Box, Text, Flex, Link, Stack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="teal.500" color="white" h="9vh" mt="auto">
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        h="100%"
        mx="auto"
        px={6}
        textAlign={{ base: "center", md: "left" }}
      >
        <Text fontSize="sm">
          © {new Date().getFullYear()} Events By Mary. All rights reserved.
        </Text>

        <Box mt={{ base: 2, md: 0 }}>
          <Stack
            direction="row"
            spacing={4}
            justify={{ base: "center", md: "flex-end" }}
          >
            <Link href="/about" _hover={{ textDecoration: "underline" }}>
              About
            </Link>
            <Link href="/contact" _hover={{ textDecoration: "underline" }}>
              Contact
            </Link>
            <Link href="https://github.com/MaryCala" isExternal _hover={{ textDecoration: "underline" }}>
              GitHub
            </Link>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
