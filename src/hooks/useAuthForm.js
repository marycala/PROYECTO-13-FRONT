import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { post } from "../utils/apiFetch";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

const useAuthForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (url, values, successMessage) => {
    setIsLoading(true);

    try {
      const data = await post(url, values);

      if (data.token && data.user) {
        login(data.token, data.user);
        toast({
          title: successMessage,
          description: "Welcome back!",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        navigate("/");
      } else {
        toast({
          title: "Error",
          description: data.message || "An error occurred.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "An error occurred.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    passwordVisible,
    setPasswordVisible,
    isLoading,
    setIsLoading,
    handleSubmit
  };
};

export default useAuthForm;
