import { Box, Flex } from "@chakra-ui/react";
import { useSessionStatus } from "@services/SessionService";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected = (): ReactElement => {
  const status = useSessionStatus();
  if (status !== "auth") {
    return <Navigate replace to={paths.signIn} />;
  }

  return (
    <Box data-testid="outer" inset={0} zIndex={-1}>
      <Flex flexDirection="column" h="calc(100vh - 80px)">
        <Outlet />
      </Flex>
    </Box>
  );
};

export default Protected;
