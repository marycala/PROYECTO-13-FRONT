import { Link } from "react-router-dom";
import { Image } from "@chakra-ui/react";
import logoImage from "../../assets/evento.png";

const Logo = () => {
  return (
    <Link to="/">
      <Image
        src={logoImage}
        alt="Event Logo"
        height="40px"
        objectFit="contain"
      />
    </Link>
  );
};

export default Logo;
