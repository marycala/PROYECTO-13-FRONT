import { Button, FormControl, FormLabel, Input, Box, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import useAuthForm from "../../hooks/useAuthForm";

const Register = () => {
  const { passwordVisible, setPasswordVisible, isLoading, handleSubmit } = useAuthForm();

  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(4, "Username must be at least 4 characters")
      .max(20, "Username cannot be more than 20 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-zA-Z]/, "Password must contain at least one letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .required("Password is required"),
  });

  return (
    <Box maxW="400px" mx="auto" p={4} pt={20}>
      <Formik
        initialValues={{
          userName: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit("/register", values, "Registration Successful")}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            <FormControl mb={4} isInvalid={touched.userName && errors.userName}>
              <FormLabel htmlFor="userName">Username</FormLabel>
              <Field
                as={Input}
                id="userName"
                name="userName"
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your username"
                isRequired
              />
              <ErrorMessage name="userName" component="div" color="red.500" />
            </FormControl>

            <FormControl mb={4} isInvalid={touched.email && errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Field
                as={Input}
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your email"
                isRequired
              />
              <ErrorMessage name="email" component="div" color="red.500" />
            </FormControl>

            <FormControl mb={4} isInvalid={touched.password && errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                  isRequired
                />
                <InputRightElement>
                  <IconButton
                    aria-label={passwordVisible ? "Hide password" : "Show password"}
                    icon={passwordVisible ? <HiEyeOff /> : <HiEye />}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    variant="link"
                  />
                </InputRightElement>
              </InputGroup>
              <ErrorMessage name="password" component="div" color="red.500" />
            </FormControl>

            <Button
              colorScheme="teal"
              width="100%"
              type="submit"
              isLoading={isLoading}
              loadingText="Registering..."
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Register;

