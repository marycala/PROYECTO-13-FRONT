import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../store/auth";
import EventDetailContent from "../../components/EventDetailContent/EventDetailContent";
import useEventDetail from "../../hooks/useEventDetail";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import GoBackButton from "../../components/GoBackButton/GoBackButton";

const EventDetail = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { event, loading } = useEventDetail(id);

  if (loading) {
    return (
      <Box textAlign="center" p={4}>
        <LoadingSpinner />
        <Text mt={2} color="gray.500">Loading event...</Text>
      </Box>
    );
  }

  if (!event) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        fontSize="lg"
        color="gray.600"
        p={4}
      >
        <Text>No event found.</Text>
        <GoBackButton size="sm" fontSize="l" px={8} py={6}/>
      </Box>
    );
  }

  const attendees = event.attendees || [];

  return <EventDetailContent event={event} attendees={attendees} isLoggedIn={!!user} />;
};

export default EventDetail;