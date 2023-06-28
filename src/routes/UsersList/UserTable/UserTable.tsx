import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { User } from "@services/UserService";
import { ReactElement } from "react";
import { Action } from "./Action/Action";

const userHeaders = [
  "Id",
  "Name",
  "Surname",
  "Email",
  "Role",
  "Account number",
  "Action",
];

type Props = {
  usersData: User[];
};

export const UserTable = ({ usersData }: Props): ReactElement => {
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
          {usersData.map((value, key) => {
            return (
              <Tr key={key}>
                <Td>{value.id}</Td>
                <Td>{value.name}</Td>
                <Td>{value.surname}</Td>
                <Td>{value.email}</Td>
                <Td>{value.role}</Td>
                <Td>{value.bank_number}</Td>
                <Td>
                  <Action id={value.id} isBaned={value.blocked} />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
