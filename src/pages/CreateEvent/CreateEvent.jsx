import React, { useMemo } from "react";
import EventForm from "../../components/EventForm/EventForm";
import useCreateEventForm from "../../hooks/useCreateEventForm";

const formatDateForInput = (dateStr) => {
  const date = new Date(dateStr);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().slice(0, 16);
};

const CreateEvent = () => {
  const initialValues = useMemo(() => ({
    title: "",
    category: "",
    date: formatDateForInput(new Date()),
    location: "",
    description: "",
    price: "",
  }), []);

  const { isLoading, setImageFile, handleSubmit } = useCreateEventForm();

  return (
    <EventForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      setImageFile={setImageFile}
      buttonText="Create Event"
    />
  );
};

export default CreateEvent;