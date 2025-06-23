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
  communities,
  resetFilters
}) => {
  return (
    <Box 
      maxWidth={{ base: "100%", md: "300px" }} 
      mb="8"
      mt="8"
      mx={{ base: 4, md: 0 }} 
      marginLeft={{ md: 8 }}
    >
      <Text fontWeight="bold" mb={2}>Search by Title</Text>
      <Input
        placeholder="Search by title"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        mb={4}
      />

      <Text fontWeight="bold" mb={2}>Search by Location</Text>
      <Select
        placeholder="Select community"
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
        mb={4}
      >
        {communities.map((community) => (
          <option key={community} value={community}>
            {community}
          </option>
        ))}
      </Select>

      <Text fontWeight="bold" mb={2}>Price Range</Text>
      <Flex gap={2} mb={4}>
        <Input
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          type="number"
        />
        <Input
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          type="number"
        />
      </Flex>

      <Text fontWeight="bold" mb={2}>Date Range</Text>
      <Flex gap={2} mb={4}>
        <Input
          type="date"
          value={minDate}
          onChange={(e) => setMinDate(e.target.value)}
          placeholder="Start Date"
        />
        <Input
          type="date"
          value={maxDate}
          onChange={(e) => setMaxDate(e.target.value)}
          placeholder="End Date"
        />
      </Flex>

      <Button
        onClick={resetFilters}
        colorScheme="red"
        size="sm"
        variant="outline"
      >
        Reset Filters
      </Button>
    </Box>
  );
};

export default Filters;
