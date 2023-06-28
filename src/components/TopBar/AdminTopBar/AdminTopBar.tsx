import { Flex, Text } from "@chakra-ui/react";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

export const AdminTopBar = (): ReactElement => {
  return (
    <Flex alignItems="center" fontSize="2xl" fontWeight="semibold" gap="8">
      <Link to={paths.usersList}>
        <Text
          _hover={{
            color: "red.200",
          }}
          transitionDuration="0.2s"
        >
          Users
        </Text>
      </Link>
      <Link to={paths.collectionsList}>
        <Text
          _hover={{
            color: "red.200",
          }}
          transitionDuration="0.2s"
        >
          Collections
        </Text>
      </Link>
    </Flex>
  );
};
