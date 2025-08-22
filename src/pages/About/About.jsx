import { Box, Heading, Text, VStack, HStack, Icon } from "@chakra-ui/react";
import { FaHeart, FaCalendarCheck, FaUsers } from "react-icons/fa";

const About = () => {
  return (
    <Box p={8} maxW="900px" mx="auto">
      <VStack spacing={6} align="start">
        <Box alignSelf="center">
          <Heading as="h1" size="2xl">About Us</Heading>
        </Box>

        <Text fontSize="lg">
          Welcome to <strong>Eventify</strong>! We help you discover and attend unforgettable events effortlessly.
        </Text>

        <HStack align="start">
          <Icon as={FaHeart} w={6} h={6} color="teal.500" mt={1} />
          <Box>
            <Heading as="h3" size="md">Favorites</Heading>
            <Text>Keep track of your favorite events and never miss the ones you love.</Text>
          </Box>
        </HStack>

        <HStack align="start">
          <Icon as={FaCalendarCheck} w={6} h={6} color="teal.500" mt={1} />
          <Box>
            <Heading as="h3" size="md">Attendance</Heading>
            <Text>Easily manage all events you’ve signed up for in one place.</Text>
          </Box>
        </HStack>

        <HStack align="start">
          <Icon as={FaUsers} w={6} h={6} color="teal.500" mt={1} />
          <Box>
            <Heading as="h3" size="md">Community</Heading>
            <Text>Join our community and connect with like-minded event-goers.</Text>
          </Box>
        </HStack>

        <Text fontSize="md">
          Our mission is to make discovering and attending events simple, enjoyable, and personalized. Explore events near you and join experiences that spark your interest!
        </Text>
      </VStack>
    </Box>
  );
};

export default About;
