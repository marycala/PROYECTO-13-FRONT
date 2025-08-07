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
  const { user } = useAuth();
  const { favorites, toggleFavorite, loading } = useFavorites();

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
    resetFilters
  } = useEventFilters();

  const filters = {
    category: selectedCategory !== "All" ? selectedCategory : undefined,
    title: searchTitle || undefined,
    location: searchLocation !== "All" ? searchLocation : undefined,
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
    minDate: minDate || undefined,
    maxDate: maxDate || undefined,
  };

  const { events, loading: eventsLoading, page, setPage, totalPages } = useFetchEvents(filters, 1, 10);

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

  return (
    <Box>
      <Flex wrap="wrap" gap={2} justify="center" mt="8" mb="8">
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

      <Flex 
        flexDirection={{ base: "column", md: "row" }} 
        align="flex-start"
        gap={6}
        px={{ base: 4, md: 8 }}
        py={4}
      >
        <Box 
          maxWidth={{ base: "100%", md: "300px" }} 
          mt={{ base: 4, md: 0 }}
          mb={{ base: 8, md: 0 }}
        >
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
        </Box>

        <Box flex="1">
          <Flex 
            flexDirection="column" 
            align="center" 
            gap={6}
            w="100%"
          >
            {events.length === 0 ? (
              <Text fontSize="lg" color="gray.600">No events available.</Text>
            ) : (
              events.map((event) => (
                <Box key={event._id} w="100%" maxW="1000px">
                  <EventCard
                    event={event}
                    isFavorite={favorites.includes(event._id)}
                    onToggleFavorite={() => toggleFavorite(event._id)}
                    loading={loading === event._id}
                    user={user}
                  />
                </Box>
              ))
            )}
          </Flex>
        </Box>
      </Flex>

      <Box mt={4} mb={8} display="flex" justifyContent="center" gap={4}>
        <Button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          isDisabled={page === 1}
        >
          Back
        </Button>
        <Text alignSelf="center">Page {page} of {totalPages}</Text>
        <Button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          isDisabled={page === totalPages}
        >
          Next
        </Button>
      </Box>

      <ScrollToTopButton />
    </Box>
  );
};

export default Events;
