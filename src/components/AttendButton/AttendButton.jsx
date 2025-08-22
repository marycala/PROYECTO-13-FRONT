import { Button } from "@chakra-ui/react";
import useAttendance from "../../context/useAttendance";

const AttendButton = ({ eventId }) => {
  const { isAttending, toggleAttendance, loading } = useAttendance();

  const attending = isAttending(eventId);
  const isLoading = loading === eventId;

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        toggleAttendance(eventId);
      }}
      colorScheme={attending ? "red" : "teal"}
      isLoading={isLoading}
    >
      {attending ? "Cancel attendance" : "Register to attend"}
    </Button>
  );
};

export default AttendButton;
