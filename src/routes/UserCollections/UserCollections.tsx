import { Flex } from "@chakra-ui/react";
import Sidebar from "@routes/UserPanel/Sidebar/Sidebar";
import { ReactElement } from "react";
import { UserCollectionData } from "./UserCollectionData/UserCollectionData";

export const UserCollections = (): ReactElement => {
  return (
    <Flex
      bgPosition="top"
      bgRepeat="no-repeat"
      bgSize="cover"
      h="calc(100vh - 80px)"
      w="full"
    >
      <Sidebar />
      <UserCollectionData />
    </Flex>
  );
};
