import React from 'react';
import {
  Box,
  Flex,
  Button,
  IconButton,
  useDisclosure,
  Stack,
  Collapse,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import Logo from '../Logo/Logo';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuLinks = (
    <>
      <Button
        as={NavLink}
        to="/"
        variant="link"
        color="white"
        _activeLink={{ color: 'yellow.300' }}
        onClick={onToggle}
      >
        Home
      </Button>
      <Button
        as={NavLink}
        to="/events"
        variant="link"
        color="white"
        _activeLink={{ color: 'yellow.300' }}
        onClick={onToggle}
      >
        Events
      </Button>
      {!isAuthenticated && (
        <>
          <Button
            as={NavLink}
            to="/register"
            variant="link"
            color="white"
            _activeLink={{ color: 'yellow.300' }}
            onClick={onToggle}
          >
            Register
          </Button>
          <Button
            as={NavLink}
            to="/login"
            variant="link"
            color="white"
            _activeLink={{ color: 'yellow.300' }}
            onClick={onToggle}
          >
            Login
          </Button>
        </>
      )}
      {isAuthenticated && (
        <>
          <Button
            as={NavLink}
            to="/events/create"
            variant="link"
            color="white"
            _activeLink={{ color: 'yellow.300' }}
            onClick={onToggle}
          >
            Create Event
          </Button>
          <Button
            as={NavLink}
            to="/favorites"
            variant="link"
            color="white"
            _activeLink={{ color: 'yellow.300' }}
            onClick={onToggle}
          >
            Favorites
          </Button>
          <Button
            as={NavLink}
            to="/attendances"
            variant="link"
            color="white"
            _activeLink={{ color: 'yellow.300' }}
            onClick={onToggle}
          >
            My Attendances
          </Button>
          <Button variant="link" color="white" onClick={handleLogout}>
            Logout
          </Button>
        </>
      )}
    </>
  );

  return (
    <Box bg="teal.500" color="white" px={4} h="9vh" position="sticky" top="0" zIndex="1000">
      <Flex h="100%" align="center" justify="space-between">
        <Box fontWeight="bold" fontSize="xl">
          <Logo/>
        </Box>

        <IconButton
          display={{ base: 'inline-flex', md: 'none' }}
          onClick={onToggle}
          icon={<HamburgerIcon />}
          variant="ghost"
          aria-label="Toggle Navigation"
          color="white"
        />

        <Flex
          gap={6}
          display={{ base: 'none', md: 'flex' }}
          align="center"
        >
          {menuLinks}
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Box bg="teal.600" mt={2} p={4} rounded="md" shadow="md" display={{ md: 'none' }}>
          <Stack spacing={4}>
            {menuLinks}
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Header;





