import { Flex, Text } from "@chakra-ui/react";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

export const UserTopBar = (): ReactElement => {
  return (
    <Flex alignItems="center" fontSize="2xl" fontWeight="semibold" gap="8">
      <Link to={paths.collections}>
        <Text
          _hover={{
            color: "red.200",
          }}
          transitionDuration="0.2s"
        >
          Collections
        </Text>
      </Link>
      <Link to={paths.about}>
        <Text
          _hover={{
            color: "red.200",
          }}
          transitionDuration="0.2s"
        >
          About us
        </Text>
      </Link>
    </Flex>
  );
};
