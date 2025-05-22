import { createContext, useContext, useState, useEffect } from "react";
import { get, patch } from "../utils/apiFetch";
import { useAuth } from "../store/auth";
import { useToast } from "@chakra-ui/react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchFavorites = async () => {
    if (!user?._id) return;
  
    setLoading(true);
    try {
      const response = await get("/users/favorites", token);
  
      setFavorites(response || []);
    } catch (err) {
      console.error("Failed to fetch favorites", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (eventId) => {
    const isAlreadyFavorite = favorites.includes(eventId);

    try {
      await patch(`/users/favorites/${eventId}`, { token });

      setFavorites((prevFavorites) => {
        if (isAlreadyFavorite) {
          return prevFavorites.filter((id) => id !== eventId);
        } else {
          return [...prevFavorites, eventId];
        }
      });

      toast({
        title: isAlreadyFavorite ? "Removed from favorites" : "Added to favorites",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Failed to toggle favorite.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchFavorites();
    }
  }, [user?._id]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        fetchFavorites,
        toggleFavorite,
        loading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

const useFavorites = () => useContext(FavoritesContext);

export default useFavorites;



