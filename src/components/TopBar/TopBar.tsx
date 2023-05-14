import { Flex, Text } from "@chakra-ui/react";
import { useSessionStatus } from "@services/SessionService";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { AuthMenu } from "./AuthMenu/AuthMenu";

export const TopBar = (): ReactElement => {
  const sessionStatus = useSessionStatus();
  return (
    <Flex
      alignItems="center"
      bg="white"
      borderBottomRadius="2xl"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      flexDir="row"
      h="20"
      justifyContent="space-between"
      px="8"
      py="2"
    >
      <Flex gap="16">
        <Link to={paths.landingPage}>
          <Flex
            alignItems="center"
            fontSize="3xl"
            fontWeight="semibold"
            gap="2"
          >
            <Text color="red.500">Toss</Text>
            <Text color="dark.400">A</Text>
            <Text color="green.100">Coin</Text>
          </Flex>
        </Link>
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
      </Flex>
      {sessionStatus === "auth" ? (
        <AuthMenu />
      ) : (
        <Flex fontSize="xl" fontWeight="semibold" gap="8">
          <Link to={paths.signIn}>
            <Text
              _hover={{
                bgColor: "green.400",
              }}
              bgColor="green.300"
              borderRadius="3xl"
              color="white"
              px="6"
              py="2"
              transitionDuration="0.2s"
            >
              Sign in
            </Text>
          </Link>
          <Link to={paths.signUp}>
            <Text
              _hover={{
                bgColor: "red.500",
              }}
              bgColor="red.300"
              borderRadius="3xl"
              color="white"
              px="6"
              py="2"
              transitionDuration="0.2s"
            >
              Sign up
            </Text>
          </Link>
        </Flex>
      )}
    </Flex>
  );
};
