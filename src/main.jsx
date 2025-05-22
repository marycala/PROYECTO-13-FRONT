import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import AppRouter from "./router/index.jsx";
import { AuthProvider } from "./store/auth";
import theme from "./theme/theme";
import { AttendanceProvider } from "./context/useAttendance.jsx";
import { FavoritesProvider } from "./context/useFavorites.jsx";

createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <AttendanceProvider>
        <FavoritesProvider>
          <AppRouter />
        </FavoritesProvider>
      </AttendanceProvider>
    </AuthProvider>
  </ChakraProvider>
);

