import { useDisclosure, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteEvent } from "../utils/apiFetch";

export const useEventActions = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pendingDelete, setPendingDelete] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  const askDelete = (event) => {
    setPendingDelete(event);
    onOpen();
  };

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    try {
      await deleteEvent(pendingDelete._id);
      toast({
        title: "Deleted",
        description: "The event has been deleted.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      onClose();
      setPendingDelete(null);
      navigate("/events");
    } catch {
      toast({
        title: "Error",
        description: "There was a problem deleting the event.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return {
    isOpen,
    onClose,
    confirmDelete,
    askDelete,
    pendingDelete,
  };
};
