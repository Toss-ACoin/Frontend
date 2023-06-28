import { Button, useToast } from "@chakra-ui/react";
import { useCollectionService } from "@services/CollectionService";
import { useMutation } from "@tanstack/react-query";
import { ReactElement } from "react";

type Props = {
  isActive: boolean;
  id: number;
};

export const Action = ({ isActive, id }: Props): ReactElement => {
  const collectionService = useCollectionService();
  const { mutate } = useMutation(collectionService.toggleCollectionAvailable);
  const toast = useToast();

  const handleToggleBan = () => {
    mutate(id, {
      onSuccess: () =>
        toast({
          status: "info",
          title: "Collection status changed",
        }),
    });
  };
  return (
    <Button onClick={handleToggleBan}>
      {isActive ? "Deactivate" : "Activate"}
    </Button>
  );
};
