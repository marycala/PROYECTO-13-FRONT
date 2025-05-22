import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  base: "0em",         // 0px
  sm: "30em",          // 480px
  custom: "43.75em",   // 700px
  md: "48em",          // 768px
  lg: "62em",          // 992px
  xl: "80em",          // 1280px
};

const theme = extendTheme({
  breakpoints,
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },
  styles: {
    global: {
      "html, body": {
        fontSize: "18px",
        margin: 0,
        padding: 0,
        height: "100%",
      },
      "#root": {
        height: "100%",
      },
    },
  },
});

export default theme;


