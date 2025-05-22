import { useState, useEffect } from "react";
import { get } from "../utils/apiFetch";
import { useToast } from "@chakra-ui/react";

const useFetchEvents = (token) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await get("/events", token);
        setEvents(eventsData);
      } catch (error) {
        toast({
          title: "Error",
          description: "An error has occurred while fetching events.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchEvents();
    }
  }, [token, toast]);

  return { events, loading };
};

export default useFetchEvents;

