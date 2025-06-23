import { Box } from "@chakra-ui/react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AppLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Box h="9vh">
        <Header />
      </Box>

      <Box
        id="scroll-container"
        h="82vh"
        overflowY="auto"
        pt={isHome ? 0 : 4}
      >
        <Outlet />
      </Box>

      <Box h="9vh">
        <Footer />
      </Box>
    </Box>
  );
};

export default AppLayout;
