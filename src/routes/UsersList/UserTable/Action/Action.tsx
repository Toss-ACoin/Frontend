import { Button, useToast } from "@chakra-ui/react";
import { useUserService } from "@services/UserService";
import { useMutation } from "@tanstack/react-query";
import { ReactElement } from "react";

type Props = {
  isBaned: boolean;
  id: number;
};

export const Action = ({ isBaned, id }: Props): ReactElement => {
  const userService = useUserService();
  const { mutate } = useMutation(userService.toggleUserBlock);
  const toast = useToast();

  const handleToggleBan = () => {
    mutate(id, {
      onSuccess: () =>
        toast({
          status: "info",
          title: "User status changed",
        }),
    });
  };
  return (
    <Button onClick={handleToggleBan}>{isBaned ? "Unbann" : "Ban"}</Button>
  );
};
