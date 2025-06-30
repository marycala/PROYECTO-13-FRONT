import React from "react";
import { Box, Heading, Text, Image, List, ListItem, Flex, Stack } from "@chakra-ui/react";
import GoBackButton from "../GoBackButton/GoBackButton";
import EventActionButtons from "../EventActionButtons/EventActionButtons";

const EventDetailContent = ({ event, attendees, isLoggedIn }) => {
  console.log("Event:", event);
  console.log("Attendees:", attendees);
  return (
    <Box maxW="90%" mx="auto" mt={2} p={4}>
     <Box marginBottom={4}>
      <GoBackButton/>
     </Box>
     <Flex direction="column" justifyContent="center" alignItems="center" gap="10px">
     <Heading mb={4}>{event.title}</Heading>
      <Image 
        src={event.img} 
        alt={event.title} 
        borderRadius="md" 
        mb={4} 
        maxH="400px" 
        objectFit="cover" 
        w="100%" 
      />
      <Stack spacing={2} align="center">
        <Text fontSize="md" mb={2} color="gray.600">
        {new Date(event.date).toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })} - {event.location}
        </Text>
        <Text mb={4}>{event.description}</Text>
        <Text fontWeight="bold" color="teal.500" mb={4}>
          {event.price != null ? `$${event.price.toFixed(2)}` : "Free"}
        </Text>
      </Stack>

      <Box mb={6}>
        <Heading size="md" mb={2}>Attendees ({attendees.length})</Heading>
        {isLoggedIn ? (
          <List spacing={1} maxH="150px" overflowY="auto" p={2}>
            {attendees.length === 0 ? (
              <Text>No attendees yet.</Text>
            ) : (
              attendees.map((attendee) => (
                <ListItem key={attendee._id}>
                  {attendee.userId?.userName || 'Unknown user'}
                </ListItem>
              ))
            )}
          </List>
        ) : (
          <Text>You must log in to see the attendee names.</Text>
        )}
      </Box>

     </Flex>
      <Flex justifyContent="center" gap="30px">
        <EventActionButtons event={event}/>
      </Flex>
    </Box>
  );
};

export default EventDetailContent;