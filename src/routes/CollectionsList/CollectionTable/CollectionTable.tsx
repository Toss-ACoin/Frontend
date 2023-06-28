import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Collections } from "@services/CollectionService";
import { ReactElement } from "react";
import { Action } from "./Action/Action";

const userHeaders = [
  "Id",
  "Title",
  "Goal",
  "Collected money",
  "Owner",
  "Start date",
  "End date",
  "Action",
];

type Props = {
  collectionData: Collections[];
};

export const CollectionTable = ({ collectionData }: Props): ReactElement => {
  return (
    <TableContainer px="32" py="16" w="full">
      <Table variant="simple">
        <Thead>
          <Tr>
            {userHeaders.map((value, key) => {
              return <Th key={key}>{value}</Th>;
            })}
          </Tr>
        </Thead>
        <Tbody>
          {collectionData.map((value, key) => {
            return (
              <Tr key={key}>
                <Td>{value.id}</Td>
                <Td>{value.title}</Td>
                <Td>{value.goal}</Td>
                <Td>{value.collected_money}</Td>
                <Td>
                  {value.owner_surname
                    ? value.owner_name + " " + value.owner_surname
                    : value.owner_name}
                </Td>
                <Td>{value.fundraising_start}</Td>
                <Td>{value.fundraising_end}</Td>

                <Td>
                  <Action id={value.id} isActive={value.available} />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
