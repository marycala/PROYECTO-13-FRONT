import { createContext, useContext, useState, useEffect } from "react";
import { get, post, remove } from "../utils/apiFetch";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../store/auth";

const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
  const { user } = useAuth();
  const [attendingEventIds, setAttendingEventIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchAttendances = async () => {
    if (!user?._id) return;

    setLoading(true);
    try {
      const response = await get(`/attendees/user/${user._id}`);
      setAttendingEventIds(response.attendances.map((att) => String(att.eventId)));
    } catch (err) {
      console.error("Failed to fetch attendances", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendances();
  }, [user?._id]);

  const isAttending = (eventId) => attendingEventIds.includes(String(eventId));

  const toggleAttendance = async (eventId) => {
    try {
      if (isAttending(eventId)) {
        await remove(`/attendees/event/${eventId}`);
        setAttendingEventIds((prev) => {
          const updated = prev.filter((id) => id !== String(eventId));
          return updated.length !== prev.length ? updated : prev;
        });
        toast({
          title: "Registration cancelled",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        await post(`/attendees/${eventId}`, { userId: user._id });
        setAttendingEventIds((prev) => {
          const updated = [...prev, String(eventId)];
          return updated.length !== prev.length ? updated : prev;
        });
        toast({
          title: "Successfully registered",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error("Error to update attendance", err);
      toast({
        title: "Error",
        description: err?.message || "Unable to update attendance",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
   
  return (
    <AttendanceContext.Provider
      value={{ attendingEventIds, isAttending, toggleAttendance, loading }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

const useAttendance = () => useContext(AttendanceContext);

export default useAttendance;
