import { useState, useEffect } from "react";
import { get } from "../utils/apiFetch";
import { useToast } from "@chakra-ui/react";

const useFetchEvents = (filters = {}, initialPage = 1, limit = 10) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const toast = useToast();

  useEffect(() => {
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

        setEvents(eventsData.events);
        setTotalPages(eventsData.totalPages);
      } catch (error) {
        toast({
          title: "Error",
          description: error.message || "An error has occurred while fetching events.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [filters, page, limit, toast]);

  return { events, loading, page, setPage, totalPages };
};

export default useFetchEvents;
