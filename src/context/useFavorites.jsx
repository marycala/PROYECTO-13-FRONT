import { createContext, useContext, useState, useEffect } from "react";
import { get, patch } from "../utils/apiFetch";
import { useAuth } from "../store/auth";
import { useToast } from "@chakra-ui/react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(null);
  const toast = useToast();

  const fetchFavorites = async () => {
    if (!user?._id || !token) return;
    try {
      const response = await get("/users/favorites", { headers: {} }, token);
      setFavorites(response || []);
    } catch (err) {
      console.error("Failed to fetch favorites", err);
    }
  };

  const toggleFavorite = async (eventId) => {
    if (!token) return;
    const isAlreadyFavorite = favorites.includes(eventId);
    setLoading(eventId);

    try {
      await patch(`/users/favorites/${eventId}`, {}, token);

      setFavorites((prev) =>
        isAlreadyFavorite
          ? prev.filter((id) => id !== eventId)
          : [...prev, eventId]
      );

      toast({
        title: isAlreadyFavorite ? "Removed from favorites" : "Added to favorites",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to toggle favorite.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(null);
    }
  };

  useEffect(() => {
    if (user?._id) fetchFavorites();
  }, [user?._id, token]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
export default useFavorites;
