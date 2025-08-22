import { useState, useEffect } from "react";
import { get } from "../utils/apiFetch";

const useLocations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await get("/events/locations");
        setLocations(data.locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  return locations;
};

export default useLocations;
