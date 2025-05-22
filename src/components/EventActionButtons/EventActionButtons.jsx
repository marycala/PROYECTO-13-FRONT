import { Button } from "@chakra-ui/react";
import { useAuth } from "../../store/auth";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { useEventActions } from "../../hooks/useEventActions";
import { useNavigate } from "react-router-dom";

const EventActionButtons = ({ event }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    isOpen,
    onClose,
    confirmDelete,
    askDelete,
    pendingDelete
  } = useEventActions();

  const isAdminOrCreator =
    user &&
    (user.rol?.includes("admin") || event?.creator?._id === user._id);

  const handleEdit = () => {
    navigate(`/edit/${event._id}`);
  };

  if (!isAdminOrCreator) return null;

  return (
    <>
      <Button onClick={handleEdit} colorScheme="blue" size="md" mt={6} mr={2}>
        Edit Event
      </Button>
      <Button
        onClick={() => askDelete(event)}
        colorScheme="red"
        size="md"
        mt={6}
      >
        Delete Event
      </Button>

      <ConfirmDialog
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmDelete}
        title="Delete Event"
        description={`Are you sure you want to delete "${pendingDelete?.title}"? This action cannot be undone.`}
      />
    </>
  );
};

export default EventActionButtons;



