import { Button, FormControl, FormLabel, Input, Box, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import useAuthForm from "../../hooks/useAuthForm";

const Login = () => {
  const { passwordVisible, setPasswordVisible, isLoading, handleSubmit } = useAuthForm();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  return (
    <Box maxW="400px" mx="auto" p={4} pt={20}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit("/users/login", values, "Logged in successfully")}
      >
        {({ values, handleChange, handleBlur, errors, touched }) => (
          <Form>
            <FormControl mb={4} isInvalid={touched.email && errors.email}>
              <FormLabel htmlFor="email">Email Address</FormLabel>
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
              loadingText="Logging in..."
            >
              Log In
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;