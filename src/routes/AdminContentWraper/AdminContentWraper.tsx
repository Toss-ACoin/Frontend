import { Box } from "@chakra-ui/react";
import {
  getSessionQueryKey,
  SessionServiceState,
} from "@services/SessionService";
import { useQueryClient } from "@tanstack/react-query";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminContentWrapper = (): ReactElement => {
  const client = useQueryClient();
  const clientData: SessionServiceState | undefined = client.getQueryData(
    getSessionQueryKey()
  );
  if (clientData?.status !== "auth") {
    return <Navigate replace to={paths.signIn} />;
  }
  if (clientData?.role !== "ROLE_ADMIN") {
    return <Navigate replace to={paths.signIn} />;
  }
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default AdminContentWrapper;
