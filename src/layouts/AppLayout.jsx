import { Box } from "@chakra-ui/react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Box h="9vh">
        <Header />
      </Box>

      <Box id="scroll-container" h="82vh" overflowY="auto">
        <Outlet />
      </Box>

      <Box h="9vh">
        <Footer />
      </Box>
    </Box>
  );
};

export default AppLayout;
