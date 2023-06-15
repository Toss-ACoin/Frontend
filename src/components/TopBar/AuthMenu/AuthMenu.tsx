import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useAuthService } from "@services/SessionService";
import { useMutation } from "@tanstack/react-query";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

export const AuthMenu = (): ReactElement => {
  const authService = useAuthService();
  const { mutate } = useMutation(authService.signOut);
  const handleSignOut = () => {
    mutate();
  };
  return (
    <Menu>
      <MenuButton
        _hover={{
          bgColor: "transparent",
          color: "red.500",
        }}
        aria-label="Options"
        as={IconButton}
        bgColor="transparent"
        color="black"
        icon={
          <Icon
            _hover={{
              color: "red.200",
            }}
            as={PersonOutlinedIcon}
            h="12"
            transitionDuration="0.2s"
            w="12"
          />
        }
      />
      <MenuList minW="fit-content">
        <Link to={paths.profile}>
          <MenuItem
            _hover={{ color: "green.100" }}
            borderRadius="md"
            fontWeight="semibold"
            px="4"
          >
            Profile
          </MenuItem>
        </Link>
        <Link to={paths.create}>
          <MenuItem
            _hover={{ color: "green.100" }}
            borderRadius="md"
            fontWeight="semibold"
            px="4"
          >
            Create collection
          </MenuItem>
        </Link>
        <MenuItem
          _hover={{ color: "green.100" }}
          borderRadius="md"
          fontWeight="semibold"
          onClick={() => handleSignOut()}
          px="4"
        >
          Sing out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
