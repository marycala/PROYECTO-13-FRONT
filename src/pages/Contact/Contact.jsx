import { Box, Heading, Text, VStack, FormControl, FormLabel, Input, Textarea, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setName("");
      setEmail("");
      setMessage("");
      toast({
        title: "Message sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }, 1000);
  };

  return (
    <Box p={8} maxW="700px" mx="auto">
      <VStack spacing={6} align="start">
        <Heading as="h1" size="2xl">Contact Us</Heading>
        <Text fontSize="lg">Have questions or feedback? Fill out the form below and we'll get in touch!</Text>

        <Box as="form" w="100%" onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </FormControl>

            <FormControl id="message" isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message..."
              />
            </FormControl>

            <Button type="submit" colorScheme="teal" isLoading={loading} w="full">
              Send Message
            </Button>
          </VStack>
        </Box>

        <Text fontSize="sm" color="gray.500">
          Or reach us directly at <strong>marycala87@gmail.com</strong>
        </Text>
      </VStack>
    </Box>
  );
};

export default Contact;
