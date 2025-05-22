import { Box, Text, Button, Flex } from "@chakra-ui/react";
import EventCard from "../../components/EventCard/EventCard";
import { useAuth } from "../../store/auth";
import useFavorites from "../../context/useFavorites";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useFetchEvents from "../../hooks/useFetchEvents";
import useEventFilters from "../../hooks/useEventFilters";
import Filters from "../../components/Filters/Filters";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";

const Events = () => {
  const { user, token } = useAuth();
  const { favorites, toggleFavorite, loading } = useFavorites();
  const { events, loading: eventsLoading } = useFetchEvents(token);
  const {
    selectedCategory,
    setSelectedCategory,
    searchTitle,
    setSearchTitle,
    searchLocation,
    setSearchLocation,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    minDate,
    setMinDate,
    maxDate,
    setMaxDate,
    categories,
    communities,
    filteredEvents,
    resetFilters
  } = useEventFilters();

  if (eventsLoading || loading) {
    return (
      <Box 
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center" 
        p={4}>
        <LoadingSpinner />
        <Text mt={2} color="gray.500">Loading events...</Text>
      </Box>
    );
  }

  const eventsToDisplay = filteredEvents(events);

  return (
    <Box>
      <Flex wrap="wrap" gap={2} justify="center" mt={{ base: "8", md: "0" }}>
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            colorScheme={selectedCategory === cat ? "teal" : "gray"}
            variant={selectedCategory === cat ? "solid" : "outline"}
            size="sm"
          >
            {cat}
          </Button>
        ))}
      </Flex>

      <Flex flexDirection={{ base: "column", md: "row" }}>
        <Filters
          searchTitle={searchTitle}
          setSearchTitle={setSearchTitle}
          searchLocation={searchLocation}
          setSearchLocation={setSearchLocation}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          minDate={minDate}
          setMinDate={setMinDate}
          maxDate={maxDate}
          setMaxDate={setMaxDate}
          communities={communities}
          resetFilters={resetFilters}
        />

        <Box flex="1" px={4}>
          <Flex flexDirection="column" align="center" gap={6} w="100%">
            {eventsToDisplay.length === 0 ? (
              <Text display="flex" alignItems="center" fontSize="lg" color="gray.600">No events available.</Text>
            ) : (
              eventsToDisplay.map((event) => {
                return (
                  <Box key={event._id} w="100%" maxW="1000px">
                    <EventCard
                      event={event}
                      isFavorite={favorites.includes(event._id)}
                      onToggleFavorite={() => toggleFavorite(event._id)}
                      loading={loading === event._id}
                      user={user}
                    />
                  </Box>
                );
              })
            )}
          </Flex>
        </Box>
      </Flex>

      <ScrollToTopButton />
    </Box>
  );
};

export default Events;