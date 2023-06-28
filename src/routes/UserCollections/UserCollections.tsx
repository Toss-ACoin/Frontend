import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
} from "@chakra-ui/react";
import Sidebar from "@routes/UserPanel/Sidebar/Sidebar";
import { useUserService } from "@services/UserService";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";

export const UserCollections = (): ReactElement => {
  const userService = useUserService();
  const { data, status } = useQuery(
    userService.userListKey(),
    userService.getUserCollections
  );

  return (
    <Flex
      bgPosition="top"
      bgRepeat="no-repeat"
      bgSize="cover"
      h="calc(100vh - 80px)"
      w="full"
    >
      <Sidebar />
      <Flex flexDir="column" py="16" w="83%">
        <Heading textAlign="center" w="full">
          Your collections
        </Heading>
        {status === "loading" ? (
          <Spinner size="xl" />
        ) : status === "error" || !data ? (
          <Box>Error</Box>
        ) : (
          <Flex
            alignItems="left"
            gap="8"
            h="20%"
            marginLeft="5"
            marginTop="10"
            textAlign="left"
            textColor="dark.400"
          >
            <Accordion w="full">
              {data.map((value, key) => {
                return (
                  <AccordionItem key={key}>
                    <h2>
                      <AccordionButton>
                        <Box
                          as="span"
                          flex="1"
                          fontWeight="semibold"
                          textAlign="left"
                        >
                          {value.title}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <TableContainer w="full">
                        <Table>
                          <Tbody>
                            <Tr>
                              <Td fontWeight="semibold">Description</Td>
                              <Td>{value.description}</Td>
                            </Tr>
                            <Tr>
                              <Td fontWeight="semibold">Goal</Td>
                              <Td>{value.goal}</Td>
                            </Tr>
                            <Tr>
                              <Td fontWeight="semibold">Collected money</Td>
                              <Td>{value.collected_money}</Td>
                            </Tr>
                            <Tr>
                              <Td fontWeight="semibold">End date</Td>
                              <Td>{value.fundraising_end}</Td>
                            </Tr>
                            <Tr>
                              <Td fontWeight="semibold">Availability</Td>
                              <Td>
                                {value.available ? "Available" : "Unavailable"}
                              </Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
