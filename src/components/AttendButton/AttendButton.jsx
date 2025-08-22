import { Button, Box } from "@chakra-ui/react";
import useAttendance from "../../context/useAttendance";

const AttendButton = ({ eventId, variant = "default" }) => {
  const { isAttending, toggleAttendance, loading } = useAttendance();
  const attending = isAttending(eventId);
  const isLoading = loading === eventId;
  const isCompact = variant === "compact";

  return (
    <Box
      mt={isCompact ? 0 : 4}
      ml={isCompact ? "auto" : 0}
      textAlign={isCompact ? "right" : "center"}
    >
      <Button
        size={isCompact ? "sm" : "md"}
        onClick={(e) => {
          e.stopPropagation();
          toggleAttendance(eventId);
        }}
        colorScheme={attending ? "red" : "teal"}
        isLoading={isLoading}
      >
        {attending ? "Cancel attendance" : "Attend"}
      </Button>
    </Box>
  );
};

export default AttendButton;
