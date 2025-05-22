import { Box, VStack, Text } from "@chakra-ui/react";
import EventCard from "../../components/EventCard/EventCard";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useFavorites from "../../context/useFavorites";
import { useAuth } from "../../store/auth";
import useFetchEvents from "../../hooks/useFetchEvents";

const Favorites = () => {
  const { token } = useAuth();
  const { favorites, loading, toggleFavorite } = useFavorites();
  const { events, loading: eventsLoading } = useFetchEvents(token);

  if (loading || eventsLoading) {
    return (
      <Box 
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center" 
        p={4}>
        <LoadingSpinner />
        <Text mt={2} color="gray.500">Loading favorites...</Text>
      </Box>
    );
  }

  const favoriteEvents = favorites
  .map((eventId) => events.find((event) => event._id === eventId))
  .filter(Boolean);

  return (
    <Box display="flex" justifyContent="center" w="100%" p={4}>
      {favoriteEvents.length === 0 ? (
        <Text display="flex" alignItems="center" fontSize="lg" color="gray.600">
          No favorite events yet.
        </Text>
      ) : (
        <VStack spacing={4} w="100%">
          {favorites.map((eventId) => {
            const event = events.find((event) => event._id === eventId);
            if (!event) return null;
            return (
              <EventCard
                key={eventId}
                event={event}
                isFavorite={favorites.includes(event._id)}
                onToggleFavorite={() => toggleFavorite(eventId)}
                variant="compact"
              />
            );
          })}
        </VStack>
        
      )}
    </Box>
  );
};

export default Favorites;