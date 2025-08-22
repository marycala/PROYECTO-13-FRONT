import { Box, Button } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const Pagination = ({ page, totalPages, setPage }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Box
      mt={4}
      mb={4}
      display="flex"
      justifyContent="center"
      gap={2}
      alignItems="center"
      flexWrap="wrap"
    >
      <Button
        colorScheme="teal"
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        isDisabled={page === 1}
        leftIcon={<ArrowLeftIcon />}
      />

      {pages.map((num) => (
        <Button
          key={num}
          size="sm"
          variant={page === num ? "solid" : "outline"}
          colorScheme="teal"
          onClick={() => setPage(num)}
        >
          {num}
        </Button>
      ))}

      <Button
        colorScheme="teal"
        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
        isDisabled={page === totalPages}
        rightIcon={<ArrowRightIcon />}
      />
    </Box>
  );
};

export default Pagination;
