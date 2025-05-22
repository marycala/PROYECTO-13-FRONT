import { useState } from "react";

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

  const communities = [
    "All",
    "Andalusia",
    "Catalonia",
    "Madrid",
    "Valencia",
    "Galicia",
    "Castile and León",
    "Basque Country",
    "Castilla-La Mancha",
    "Canary Islands",
    "Balearic Islands",
    "Aragon",
    "Murcia",
    "Extremadura",
    "Cantabria",
    "La Rioja",
    "Navarre",
    "Asturias",
    "Ceuta",
    "Melilla",
  ];

  const filteredEvents = (events) => {
    return events.filter((event) => {
      return (
        (selectedCategory === "All" || event.category === selectedCategory) &&
        (searchTitle === "" || event.title.toLowerCase().includes(searchTitle.toLowerCase())) &&
        (searchLocation === "All" || event.location.toLowerCase().includes(searchLocation.toLowerCase())) &&
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
