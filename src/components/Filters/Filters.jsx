import { Box, Text, Input, Select, Flex, Button } from "@chakra-ui/react";

const Filters = ({
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
  locations = [],
  resetFilters,
  priceError,
  dateError,
}) => {
  return (
    <Box
      maxWidth={{ base: "100%", md: "300px" }}
      mt={{ base: "15", md: "0" }}
      mb="8"
      mx={{ base: 4, md: 0 }}
      marginLeft={{ md: 8 }}
    >
      <Text fontWeight="bold" mb={2}>
        Search by Title
      </Text>
      <Input
        placeholder="Search by title"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        mb={4}
      />

      <Text fontWeight="bold" mb={2}>
        Search by Location
      </Text>
      <Select
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
      >
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </Select>

      <Text fontWeight="bold" mb={2}>
        Price Range
      </Text>
      <Flex gap={2} mb={1}>
        <Input
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          type="number"
          isInvalid={!!priceError}
        />
        <Input
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          type="number"
          isInvalid={!!priceError}
        />
      </Flex>
      {priceError && (
        <Text color="red.500" fontSize="sm" mb={4}>
          {priceError}
        </Text>
      )}

      <Text fontWeight="bold" mb={2}>
        Date Range
      </Text>
      <Flex gap={2} mb={1}>
        <Input
          type="date"
          value={minDate}
          onChange={(e) => setMinDate(e.target.value)}
          placeholder="Start Date"
          isInvalid={!!dateError}
        />
        <Input
          type="date"
          value={maxDate}
          onChange={(e) => setMaxDate(e.target.value)}
          placeholder="End Date"
          isInvalid={!!dateError}
        />
      </Flex>
      {dateError && (
        <Text color="red.500" fontSize="sm" mb={4}>
          {dateError}
        </Text>
      )}

      <Button
        onClick={resetFilters}
        colorScheme="red"
        size="sm"
        variant="outline"
        isDisabled={!!priceError || !!dateError}
      >
        Reset Filters
      </Button>
    </Box>
  );
};

export default Filters;
