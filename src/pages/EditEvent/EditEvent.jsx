import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventForm from "../../components/EventForm/EventForm";
import useEditEventForm from "../../hooks/useEditEventForm";
import { get } from "../../utils/apiFetch";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { Box } from "@chakra-ui/react";

const formatDateForInput = (dateStr) => {
  const date = new Date(dateStr);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().slice(0, 16);
};

const EditEvent = () => {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState(null);
  const { isLoading, setImageFile, handleSubmit } = useEditEventForm(id);

  useEffect(() => {
    const fetchEvent = async () => {
      const data = await get(`/events/${id}`);
      const { title, category, date, location, description, price } = data;
      setInitialValues({
        title,
        category,
        date: formatDateForInput(date),
        location,
        description,
        price,
      });      
    };
    fetchEvent();
  }, [id]);

  if (!initialValues) {
    return (
      <Box textAlign="center" p={4}>
        <LoadingSpinner />
      </Box>
    );
  }

  return (
    <EventForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonText="Update Event"
      setImageFile={setImageFile}
    />
  );
};

export default EditEvent;