import { useState, useEffect } from "react";
import regions from "../utils/regions";

const useEventFilters = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const [priceError, setPriceError] = useState(null);
  const [dateError, setDateError] = useState(null);

  const categories = [
    "All",
    "Music",
    "Sports",
    "Tech",
    "Art",
    "Food",
    "Business",
    "Education",
    "Health",
    "Gaming",
    "Travel",
    "Fashion",
    "Other",
  ];
  const communities = ["All", ...Object.keys(regions)];

  useEffect(() => {
    if (minPrice !== "" && maxPrice !== "") {
      if (parseFloat(minPrice) > parseFloat(maxPrice)) {
        setPriceError("El precio mínimo no puede ser mayor que el máximo.");
      } else {
        setPriceError(null);
      }
    } else {
      setPriceError(null);
    }

    if (minDate !== "" && maxDate !== "") {
      if (new Date(minDate) > new Date(maxDate)) {
        setDateError("La fecha de inicio no puede ser mayor que la de fin.");
      } else {
        setDateError(null);
      }
    } else {
      setDateError(null);
    }
  }, [minPrice, maxPrice, minDate, maxDate]);

  const filteredEvents = (events) => {
    if (priceError || dateError) return [];

    return events.filter((event) => {
      return (
        (selectedCategory === "All" || event.category === selectedCategory) &&
        (searchTitle === "" || event.title.toLowerCase().includes(searchTitle.toLowerCase())) &&
        (searchLocation === "All" || (regions[searchLocation] && regions[searchLocation].includes(event.location))) &&
        (minPrice === "" || event.price >= parseFloat(minPrice)) &&
        (maxPrice === "" || event.price <= parseFloat(maxPrice)) &&
        (minDate === "" || new Date(event.date) >= new Date(minDate)) &&
        (maxDate === "" || new Date(event.date) <= new Date(maxDate))
      );
    });
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchTitle("");
    setSearchLocation("All");
    setMinPrice("");
    setMaxPrice("");
    setMinDate("");
    setMaxDate("");
    setPriceError(null);
    setDateError(null);
  };

  return {
    selectedCategory,
    setSelectedCategory,
    searchTitle,
    setSearchTitle,
    searchLocation,
    setSearchLocation,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    minDate,
    setMinDate,
    maxDate,
    setMaxDate,
    categories,
    communities,
    filteredEvents,
    resetFilters,
    priceError,
    dateError,
  };
};

export default useEventFilters;
