import { Box, SimpleGrid, Text } from "@chakra-ui/react";
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
        p={4}
      >
        <LoadingSpinner />
        <Text mt={2} color="gray.500">Loading favorites...</Text>
      </Box>
    );
  }

  const favoriteEvents = favorites
    .map((eventId) => events.find((event) => event._id === eventId))
    .filter(Boolean);

  if (favoriteEvents.length === 0) {
    return (
      <Box display="flex" justifyContent="center" w="100%" h="100%" p={4}>
        <Text display="flex" alignItems="center" fontSize="lg" color="gray.600">
          No favorite events yet.
        </Text>
      </Box>
    );
  }

  return (
    <Box p={4} display="flex" justifyContent="center">
      {favoriteEvents.length === 1 ? (
        <EventCard
          key={favoriteEvents[0]._id}
          event={favoriteEvents[0]}
          isFavorite={favorites.includes(favoriteEvents[0]._id)}
          onToggleFavorite={() => toggleFavorite(favoriteEvents[0]._id)}
          variant="compact"
          maxW={{ base: "90%", sm: "730px", md: "1000px" }}
          w="100%"
        />
      ) : (
        <SimpleGrid
          minChildWidth={{ base: "90%", sm: "450px", md: "700px" }}
          spacing={6}
          w="100%"
          justifyItems="center"
        >
          {favoriteEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              isFavorite={favorites.includes(event._id)}
              onToggleFavorite={() => toggleFavorite(event._id)}
              variant="compact"
              maxW={{ base: "90%", sm: "730px" }}
              w="50%"
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );  
};

export default Favorites;
