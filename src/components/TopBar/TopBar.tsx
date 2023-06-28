import { Flex, Text } from "@chakra-ui/react";
import {
  getSessionQueryKey,
  SessionServiceState,
  useSessionStatus,
} from "@services/SessionService";
import { useQueryClient } from "@tanstack/react-query";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { AdminTopBar } from "./AdminTopBar/AdminTopBar";
import { AuthMenu } from "./AuthMenu/AuthMenu";
import { UserTopBar } from "./UserTopBar/UserTopBar";

export const TopBar = (): ReactElement => {
  const sessionStatus = useSessionStatus();
  const client = useQueryClient();
  const clientData: SessionServiceState | undefined = client.getQueryData(
    getSessionQueryKey()
  );
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
          {!clientData || clientData.status !== "auth" ? (
            <UserTopBar />
          ) : clientData.status === "auth" &&
            clientData.role !== "ROLE_ADMIN" ? (
            <UserTopBar />
          ) : (
            clientData.status === "auth" &&
            clientData.role === "ROLE_ADMIN" && <AdminTopBar />
          )}
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
