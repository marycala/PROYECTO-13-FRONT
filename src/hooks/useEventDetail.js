import { useState, useEffect } from "react";
import { get } from "../utils/apiFetch";
import { useToast } from "@chakra-ui/react";

const useEventDetail = (id) => {
  const toast = useToast();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      setLoading(true);
      try {
        const data = await get(`/events/${id}`);
        setEvent(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Error loading event.");
        toast({
          title: "Error",
          description: err.message || "Error loading event.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, toast]);

  const attendees = event?.attendees || [];

  return { event, attendees, loading, error };
};

export default useEventDetail;

