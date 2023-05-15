import {
  Avatar,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  Text,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import Sidebar from "./Sidebar/Sidebar";
import Edit from "@mui/icons-material/Edit";

const UserPanel = (): ReactElement => {
  return (
    <>
      <Flex
        bgPosition="top"
        bgRepeat="no-repeat"
        bgSize="cover"
        h="calc(100vh - 80px)"
        w="full"
      >
        <Sidebar />
        <Flex flexDir="column" w="83%">
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
              Username
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
                    <Td>name</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="semibold">Surname</Td>
                    <Td>surname</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="semibold">Email</Td>
                    <Td>email</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="semibold">Phone number</Td>
                    <Td> 123 456 789</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="semibold">Date of birth</Td>
                    <Td> 01.01.1999</Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="semibold">Bank account number</Td>
                    <Td> 1111 2222 3333 4444 5555</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default UserPanel;
