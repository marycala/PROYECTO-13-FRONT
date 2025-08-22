import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { post } from '../utils/apiFetch';
import { useAuth } from '../store/auth';

const useCreateEventForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();
  const { token } = useAuth();

  const validCategories = [
    "Music", "Sports", "Tech", "Art", "Food", "Business",
    "Education", "Health", "Gaming", "Travel", "Fashion", "Other"
  ];

  const handleSubmit = async (values) => {
    setIsLoading(true);

    try {
      let category = values.category?.trim();
      category = validCategories.find(
        (cat) => cat.toLowerCase() === category?.toLowerCase()
      );

      if (!category) {
        toast({
          title: "Invalid category",
          description: `Category must be one of: ${validCategories.join(", ")}`,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        setIsLoading(false);
        return;
      }

      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (values[key] !== undefined && values[key] !== null) {
          if (key === "category") {
            formData.append("category", category);
          } else {
            formData.append(key, values[key]);
          }
        }
      });

      if (imageFile) formData.append("img", imageFile);

      const data = await post("/events/create", formData, token, { isFormData: true });

      toast({
        title: "Event created successfully",
        description: data.message || "Your event has been created successfully!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      navigate("/events");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "There was an error creating the event.",
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

export default useCreateEventForm;
