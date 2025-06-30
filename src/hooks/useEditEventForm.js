import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { put } from "../utils/apiFetch";

const useEditEventForm = (eventId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, String(values[key]));
      }
      if (imageFile) {
        formData.append("img", imageFile);
      }

      const updated = await put(`/events/${eventId}`, formData, true);

      toast({
        title: "Event updated",
        description: updated.message || "The event was updated successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      navigate("/events");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "There was a problem updating the event.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    setImageFile,
    handleSubmit,
  };
};

export default useEditEventForm;
