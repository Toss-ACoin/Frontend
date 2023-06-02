import { Flex, Text, Heading } from "@chakra-ui/react";

import { ReactElement } from "react";
import { paths } from "@utils/paths";
import { Link } from "react-router-dom";

const Sidebar = (): ReactElement => {
  return (
    <Flex
      alignItems="center"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      flexDir="column"
      gap="8"
      justifyContent="space-between"
      marginTop="2.5"
      textAlign="center"
      textColor="white"
      w="15%"
    >
      <Flex flexDir="column" gap="8" padding="15px">
        <Heading color="black" size="lg">
          Menu
        </Heading>
        <Link to={paths.profile}>
          <Text
            _hover={{
              color: "red.200",
            }}
            color="black"
            fontSize="lg"
            fontWeight="semibold"
            transitionDuration="0.2s"
          >
            My Profile
          </Text>
        </Link>
        <Text
          _hover={{
            color: "red.200",
          }}
          color="black"
          fontSize="lg"
          fontWeight="semibold"
          transitionDuration="0.2s"
        >
          My Collections
        </Text>
      </Flex>
    </Flex>
  );
};

export default Sidebar;
