import { createContext, useContext, useState, useEffect } from "react";
import { get, post, remove } from "../utils/apiFetch";
import { useToast } from "@chakra-ui/react";
import { useAuth } from "../store/auth";

const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [attendingEventIds, setAttendingEventIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchAttendances = async () => {
    if (!user?._id || !token) return;

    setLoading(true);
    try {
      const response = await get(`/attendees/user/${user._id}`, {}, token);
      setAttendingEventIds(
        response.attendances.map((att) => String(att.eventId))
      );
    } catch (err) {
      console.error("Failed to fetch attendances", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) fetchAttendances();
  }, [user?._id, token]);

  const isAttending = (eventId) => attendingEventIds.includes(String(eventId));

  const toggleAttendance = async (eventId) => {
    if (!token) return;

    setLoading(true);
    try {
      if (isAttending(eventId)) {
        await remove(`/attendees/event/${eventId}`, token);
        setAttendingEventIds((prev) =>
          prev.filter((id) => id !== String(eventId))
        );
        toast({
          title: "Registration cancelled",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        await post(`/attendees/${eventId}`, { userId: user._id }, token);
        setAttendingEventIds((prev) => [...prev, String(eventId)]);
        toast({
          title: "Successfully registered",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error("Error updating attendance", err);
      toast({
        title: "Error",
        description: err?.message || "Unable to update attendance",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
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

export const useAttendance = () => useContext(AttendanceContext);
export default useAttendance;
