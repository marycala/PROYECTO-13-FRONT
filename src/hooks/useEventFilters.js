import { useState } from "react";
import regions from "../utils/regions";

const useEventFilters = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

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

  const filteredEvents = (events) => {
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
  };
};

export default useEventFilters;
