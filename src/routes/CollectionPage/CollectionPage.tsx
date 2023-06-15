import {
  Box,
  Button,
  Flex,
  Heading,
  Highlight,
  Progress,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useCollectionService } from "@services/CollectionService";
import { useQuery } from "@tanstack/react-query";
import { paths, useCollectionId } from "@utils/paths";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { Bubble } from "./Bubble/Bubble";

const CollectionPage = (): ReactElement => {
  const id = useCollectionId();
  const collectionService = useCollectionService();
  if (!id) {
    return <Navigate to={paths.notFound} />;
  }

  const { data, status } = useQuery(
    collectionService.collectionKey(`${id}`),
    collectionService.collection
  );
  if (status === "loading") {
    return <Spinner size="xl" />;
  }
  if (status === "error" || !data) {
    return <Box>Error</Box>;
  }
  return (
    <Flex flexDir="column" gap="16" px="40" py="16">
      <Flex
        gap="8"
        maxH="calc(100vh - 80px - 128px)"
        maxW="calc(100vw - 256px)"
      >
        {/* <ImgCarousel imgArray={data.image} /> */}
        <Flex flexDir="column" gap="6" maxH="560px">
          <Text fontSize="4xl" fontWeight="semibold">
            {data.title}
          </Text>
          <Text fontSize="2xl" fontWeight="semibold">
            <Highlight query={`${data.goal}$`} styles={{ fontWeight: "bold" }}>
              {`${data.value}$ of ${data.goal}$`}
            </Highlight>
          </Text>
          <Progress borderRadius="lg" colorScheme="red" h="9" value={20} />
          <Button fontSize="3xl" h="16">
            DONATE
          </Button>
        </Flex>
      </Flex>
      <Flex flexDir="column" gap="8">
        <Heading>Description</Heading>
        <Flex flexDir="column" fontSize="xl" gap="4">
          {data?.description}
        </Flex>
      </Flex>
      <Flex
        border="1px"
        borderColor="dark.200"
        borderRadius="md"
        justifyContent="center"
        overflow="hidden"
        p="6"
      >
        <Bubble data={data.donation} />
      </Flex>
    </Flex>
  );
};

export default CollectionPage;
