import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

const GoBackButton = ({ label = "Go back", ...props }) => {
  const navigate = useNavigate();

  return (
    <Button 
      colorScheme="teal"
      size="xs"
      fontSize="sm"
      px={2}
      py={4}
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.3)"
      mt={4} 
      onClick={() => navigate(-1)} leftIcon={<ArrowBackIcon />} {...props}>
      {label}
    </Button>
  );
};

export default GoBackButton;
