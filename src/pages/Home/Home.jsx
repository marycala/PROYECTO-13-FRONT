import { Box, Button, Text, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Box
      bgImage="url('/images/background.jpg')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      backgroundAttachment="fixed"
      m="0"
      p="0"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      color="white"
    >
      <Flex direction="column" align="center" gap={6}>
        <Text fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }} fontWeight="bold" textShadow="2px 2px 8px rgba(0, 0, 0, 0.8)">
          Welcome to Eventify
        </Text>
        <Text fontSize={{ base: "xl", md: "2xl", lg: "3xl" }} textShadow="1px 1px 6px rgba(0, 0, 0, 0.7)">
          Discover and create amazing events
        </Text>
        <Button 
          colorScheme="teal" 
          size="lg" 
          fontSize="xl"
          px={8}
          py={6}
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
          onClick={() => navigate("/events")}
        >
          Explore Events
        </Button>
      </Flex>
    </Box>
  );
};

export default Home;
