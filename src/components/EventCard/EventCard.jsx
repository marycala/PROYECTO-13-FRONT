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
import { useFavorites } from "../../context/useFavorites";

const EventCard = ({ event, variant = "default", maxW }) => {
  const isCompact = variant === "compact";
  const navigate = useNavigate();
  const { favorites, toggleFavorite, loading } = useFavorites();
  const isFavorite = favorites.includes(event._id);

  const handleCardClick = () => {
    navigate(`/events/${event._id}`);
  };

  return (
    <Box
      onClick={handleCardClick}
      borderWidth="1px"
      borderRadius="md"
      p={isCompact ? 3 : 4}
      boxShadow="lg"
      display="flex"
      flexDirection={isCompact ? "row" : "column"}
      justifyContent={isCompact ? "flex-start" : "center"}
      alignItems="center"
      w="100%"
      maxW={maxW}
      position="relative"
      cursor="pointer"
      _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
      transition="all 0.2s"
    >
      <Box
        position="absolute"
        top={2}
        right={2}
        zIndex={1}
        onClick={(e) => e.stopPropagation()}
      >
        <FavoriteButton
          isFavorite={isFavorite}
          onToggleFavorite={() => toggleFavorite(event._id)}
          loading={loading}
          eventId={event._id}
        />
      </Box>

      {isCompact ? (
        <Image
          src={event.img}
          alt={event.title}
          w={{ sm: "220px", md: "320px" }}
          h={{ sm: "100px", md: "200px" }}
          objectFit="contain"
          borderRadius="md"
          mr={4}
          flexShrink={0}
        />
      ) : (
        <AspectRatio ratio={16 / 9} w="100%" mb={4} borderRadius="md" overflow="hidden">
          <Image
            src={event.img}
            alt={event.title}
            objectFit="contain"
            objectPosition="center"
          />
        </AspectRatio>
      )}

      <Box flex="1" ml={isCompact ? 0 : 0} textAlign={isCompact ? "left" : "center"}>
        <Heading size={isCompact ? "sm" : "md"} noOfLines={2}>
          {event.title}
        </Heading>
        <Text fontSize={isCompact ? "xs" : "sm"} color="gray.500" mt={1}>
          {new Date(event.date).toLocaleString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })} - {event.location}
        </Text>
        {!isCompact && <Text mt={2} noOfLines={4}>{event.description}</Text>}
        <Text fontWeight="bold" color="teal.500" mt={2} fontSize={isCompact ? "sm" : "md"}>
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
