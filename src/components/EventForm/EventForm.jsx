import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const categories = [
  "Music", "Sports", "Tech", "Art", "Food", "Business",
  "Education", "Health", "Gaming", "Travel", "Fashion", "Other",
];

const validationSchema = Yup.object({
  title: Yup.string().min(4).max(50).required("Event title is required"),
  category: Yup.string()
    .oneOf(categories, "Invalid category")
    .required("Category is required"),
  date: Yup.date().required("Date is required"),
  location: Yup.string().required("Location is required"),
  description: Yup.string().max(500).required("Description is required"),
  price: Yup.number().min(0).required("Price is required"),
});

const EventForm = ({
  initialValues,
  onSubmit,
  isLoading,
  buttonText,
  setImageFile,
}) => {
  return (
    <Box maxW="600px" mx="auto" p={4} pt={10} pb={10}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={false}
      >
        {({ errors, touched }) => (
          <Form>
            {[
              { id: "title", type: "text" },
              { id: "date", type: "datetime-local" },
              { id: "location", type: "text" },
              { id: "price", type: "number" },
            ].map(({ id, type }) => (
              <FormControl key={id} mb={4} isInvalid={touched[id] && errors[id]}>
                <FormLabel htmlFor={id}>{id[0].toUpperCase() + id.slice(1)}</FormLabel>
                <Field as={Input} id={id} name={id} type={type} />
                <ErrorMessage name={id} component="div" style={{ color: "red" }} />
              </FormControl>
            ))}

            <FormControl mb={4} isInvalid={touched.category && errors.category}>
              <FormLabel htmlFor="category">Category</FormLabel>
              <Field as={Select} id="category" name="category">
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" style={{ color: "red" }} />
            </FormControl>

            <FormControl mb={4} isInvalid={touched.description && errors.description}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Field as={Textarea} id="description" name="description" />
              <ErrorMessage name="description" component="div" style={{ color: "red" }} />
            </FormControl>

            {setImageFile && (
              <FormControl mb={4}>
                <FormLabel htmlFor="image">Image</FormLabel>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.currentTarget.files[0])}
                />
              </FormControl>
            )}

            <Button
              colorScheme="teal"
              width="100%"
              type="submit"
              isLoading={isLoading}
              loadingText={buttonText}
            >
              {buttonText}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EventForm;
