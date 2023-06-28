import { Flex } from "@chakra-ui/react";
import { ReactElement } from "react";
import Sidebar from "./Sidebar/Sidebar";
import { UserData } from "./UserData/UserData";

const UserPanel = (): ReactElement => {
  return (
    <Flex
      bgPosition="top"
      bgRepeat="no-repeat"
      bgSize="cover"
      h="calc(100vh - 80px)"
      w="full"
    >
      <Sidebar />
      <UserData />
    </Flex>
  );
};

export default UserPanel;
