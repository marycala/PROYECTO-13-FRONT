import React from 'react';
import { Box, Button, Text, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Center h="100vh" flexDirection="column">
      <Box textAlign="center" p={5} borderWidth={1} borderRadius="md" boxShadow="lg">
        <Text fontSize="4xl" fontWeight="bold" mb={4}>
          404 - Page Not Found
        </Text>
        <Text fontSize="lg" color="gray.500" mb={6}>
          Oops! The page you're looking for doesn't exist.
        </Text>
        <Button colorScheme="teal" onClick={handleGoHome}>
          Go to Homepage
        </Button>
      </Box>
    </Center>
  );
};

export default NotFound;
