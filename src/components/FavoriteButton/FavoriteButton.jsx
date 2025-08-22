import { IconButton } from "@chakra-ui/react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const FavoriteButton = ({ isFavorite, onToggleFavorite, loading, eventId }) => {
  const isLoading = loading === eventId;

  return (
    <IconButton
      icon={isLoading ? <LoadingSpinner size="sm" /> : isFavorite ? <HiHeart /> : <HiOutlineHeart />}
      colorScheme="red"
      variant="ghost"
      onClick={(e) => {
        e.stopPropagation();
        onToggleFavorite();
      }}
      isDisabled={isLoading}
      aria-label="Toggle Favorite"
      size="lg"
      fontSize="4xl"
      position="absolute"
      top={2}
      right={1}
      zIndex={1}
    />
  );
};

export default FavoriteButton;
