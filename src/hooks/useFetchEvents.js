import { useState, useEffect } from "react";
import { get } from "../utils/apiFetch";
import { useToast } from "@chakra-ui/react";

const useFetchEvents = (filters = {}, page = 1, limit = 10) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const toast = useToast();

  useEffect(() => {
    let ignore = false;

    const fetchEvents = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", limit);

        for (const key in filters) {
          if (filters[key] !== undefined && filters[key] !== "") {
            params.append(key, filters[key]);
          }
        }

        const eventsData = await get(`/events?${params.toString()}`);

        if (!ignore) {
          setEvents(eventsData.events || []);
          setTotalPages(eventsData.totalPages || 1);
        }
      } catch (error) {
        if (!ignore) {
          toast({
            title: "Error",
            description: error.message || "An error occurred while fetching events.",
            status: "error",
            duration: 4000,
            isClosable: true,
          });
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchEvents();
    return () => { ignore = true; };

  }, [JSON.stringify(filters), page, limit, toast]);

  return { events, loading, totalPages };
};

export default useFetchEvents;
