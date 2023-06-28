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
import { useUserService } from "@services/UserService";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";

export const UserCollectionData = (): ReactElement => {
  const userService = useUserService();
  const { data, status } = useQuery(
    userService.userCollectionKey(),
    userService.getUserCollections
  );

  return (
    <Flex flexDir="column" py="16" w="83%">
      <Heading textAlign="center" w="full">
        Your collections
      </Heading>
      {status === "loading" ? (
        <Spinner size="xl" />
      ) : status === "error" || !data ? (
        <Box>Error</Box>
      ) : data.length <= 0 ? (
        <Flex
          alignItems="left"
          gap="8"
          h="20%"
          marginLeft="5"
          marginTop="10"
          textAlign="left"
          textColor="dark.400"
        >
          <Heading textAlign="center" w="full">
            You do not have any collections
          </Heading>
        </Flex>
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
  );
};
