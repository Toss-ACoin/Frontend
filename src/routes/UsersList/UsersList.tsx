import { Box, Flex, Highlight, Icon, Spinner, Text } from "@chakra-ui/react";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import { useUserService } from "@services/UserService";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { UserTable } from "./UserTable/UserTable";

export const UsersList = (): ReactElement => {
  const userService = useUserService();
  const { data, status } = useQuery(
    userService.userListKey(),
    userService.getUserList,
    {
      refetchInterval: 10000,
    }
  );

  return (
    <Flex alignItems="center" flexDir="column" pb="16">
      {status === "loading" ? (
        <Spinner size="xl" />
      ) : status === "error" || !data ? (
        <Box>Error</Box>
      ) : data.length <= 0 ? (
        <Flex alignItems="center" h="full" justifyContent="center" w="full">
          <Flex
            borderRadius="lg"
            boxShadow="md"
            flexDir="column"
            gap="4"
            p="32"
            w="35%"
          >
            <Icon as={SearchOffOutlinedIcon} color="red.500" h="20" w="full" />

            <Text
              fontSize="2xl"
              fontWeight="semibold"
              noOfLines={3}
              textAlign="center"
            >
              <Highlight
                query="users"
                styles={{ fontWeight: "bold", color: "green.500" }}
              >
                {`Sorry there is no users`}
              </Highlight>
            </Text>
          </Flex>
        </Flex>
      ) : (
        <UserTable usersData={data} />
      )}
    </Flex>
  );
};
