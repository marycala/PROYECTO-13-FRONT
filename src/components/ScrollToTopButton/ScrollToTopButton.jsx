import { IconButton, Fade } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = document.getElementById("scroll-container");
    if (!container) return;

    const toggleVisibility = () => {
      setIsVisible(container.scrollTop > 300);
    };

    container.addEventListener("scroll", toggleVisibility);
    return () => container.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const container = document.getElementById("scroll-container");
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Fade in={isVisible}>
      <IconButton
        icon={<ChevronUpIcon />}
        position="fixed"
        bottom="90px"
        right="30px"
        zIndex={1000}
        colorScheme="teal"
        borderRadius="full"
        size="lg"
        aria-label="Scroll to top"
        onClick={scrollToTop}
      />
    </Fade>
  );
};

export default ScrollToTopButton;

