import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Spacer,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import Edit from "@mui/icons-material/Edit";
import { useUserService } from "@services/UserService";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";

export const UserData = (): ReactElement => {
  const userService = useUserService();
  const { data, status } = useQuery(
    userService.userListKey(),
    userService.getUserDate
  );
  return (
    <Flex flexDir="column" w="83%">
      {status === "loading" ? (
        <Spinner size="xl" />
      ) : status === "error" || !data ? (
        <Box>Error</Box>
      ) : (
        <>
          <Flex
            alignItems="left"
            gap="8"
            h="20%"
            marginLeft="5"
            marginTop="10"
            textAlign="left"
            textColor="dark.400"
          >
            <Avatar size="2xl" />
            <Text
              color="black"
              fontSize="3xl"
              fontWeight="semibold"
              marginTop="7"
              maxW="96"
            >
              {data.name}
            </Text>
            <Spacer />
            <Button colorScheme="red" leftIcon={<Edit />} variant="solid">
              Edit
            </Button>
          </Flex>
          <Divider />
          <Text
            color="black"
            fontSize="2xl"
            fontWeight="semibold"
            marginLeft="15px"
            marginTop="7"
            maxW="96"
          >
            User Information
          </Text>
          <Flex gap="16" marginTop="5" w="50%">
            <TableContainer w="full">
              <Table>
                <Tbody>
                  <Tr>
                    <Td fontWeight="semibold">Name</Td>
                    <Td>{data.name}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="semibold">Surname</Td>
                    <Td>{data.surname}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="semibold">Email</Td>
                    <Td>{data.email}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="semibold">Phone number</Td>
                    <Td> {data.phone_number}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="semibold">Date of birth</Td>
                    <Td>{data.birth_date}</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="semibold">Bank account number</Td>
                    <Td>{data.bank_number}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        </>
      )}
    </Flex>
  );
};
