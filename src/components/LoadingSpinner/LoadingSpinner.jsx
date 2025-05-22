import { Spinner, Center } from "@chakra-ui/react";

const LoadingSpinner = ({ size = "xl", color = "teal.500", mt = 10 }) => {
  return (
    <Center mt={mt}>
      <Spinner size={size} color={color} />
    </Center>
  );
};

export default LoadingSpinner;
