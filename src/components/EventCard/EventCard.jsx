import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  Heading,
  Text,
  AspectRatio,
} from "@chakra-ui/react";
import FavoriteButton from "../../components/FavoriteButton/FavoriteButton";
import AttendButton from "../../components/AttendButton/AttendButton";

const EventCard = ({
  event,
  isFavorite,
  onToggleFavorite,
  variant = "default",
}) => {
  const isCompact = variant === "compact";

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/events/${event._id}`);
  };

  return (
    <Box
      onClick={handleCardClick}
      borderWidth="1px"
      borderRadius="md"
      p={4}
      boxShadow="lg"
      display="flex"
      flexDirection={
        isCompact
          ? { base: "column", custom: "row" }
          : "column"
      }
      justifyContent={isCompact ? "space-between" : "center"}
      alignItems="center"
      w={isCompact ? "80%" : ["90%", "85%", "80%"]}
      maxW={isCompact ? "none" : "1000px"}
      mx={isCompact ? 0 : "auto"}
      minH={isCompact ? "150px" : "500px"}
      position="relative"
      cursor="pointer"
      _hover={{ boxShadow: "xl", transform: "scale(1.05)" }}
    >
      <Box
        position="absolute"
        top={2}
        right={1}
        zIndex={1}
        onClick={(e) => e.stopPropagation()}
      >
        <FavoriteButton
          eventId={event._id}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      </Box>

      {isCompact ? (
        <Image
          src={event.img}
          alt={event.title}
          w="40%"
          h="150px"
          objectFit="cover"
          borderRadius="md"
          mr={4}
        />
      ) : (
        <AspectRatio
          ratio={16 / 9}
          w="80%"
          maxW="1200px"
          mb={4}
          borderRadius="md"
          overflow="hidden"
        >
          <Image
            src={event.img}
            alt={event.title}
            objectFit="cover"
            objectPosition="center"
          />
        </AspectRatio>
      )}

      <Box flex="1" align="center">
        <Heading size="md">{event.title}</Heading>
        <Text fontSize="sm" color="gray.500">
        {new Date(event.date).toLocaleString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })} - {event.location}
        </Text>
        {!isCompact && (
          <Text mt={2}>{event.description}</Text>
        )}
        <Text fontWeight="bold" color="teal.500" mt={2}>
          {event.price != null ? `$${event.price.toFixed(2)}` : "Free"}
        </Text>

        <Box mt={4}>
          <AttendButton eventId={event._id} />
        </Box>
      </Box>
    </Box>
  );
};

export default EventCard;