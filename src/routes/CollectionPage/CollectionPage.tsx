import {
  Box,
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
import photo from "./assets/img.png";
import { Bubble } from "./Bubble/Bubble";
import { Donation } from "./Donation/Donation";
import { ImgCarousel } from "./ImgCarousel/ImgCarousel";

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
        <ImgCarousel imgArray={[photo, photo, photo]} />
        <Flex flexDir="column" gap="6" maxH="560px">
          <Text fontSize="4xl" fontWeight="semibold">
            {data.title}
          </Text>
          <Text fontSize="2xl" fontWeight="semibold">
            <Highlight query={`${data.goal}zł`} styles={{ fontWeight: "bold" }}>
              {`${data.collected_money}zł of ${data.goal}zł`}
            </Highlight>
          </Text>
          <Progress borderRadius="lg" colorScheme="red" h="9" value={20} />
          <Donation collectionId={data.id} name={data.title} />
        </Flex>
      </Flex>
      <Flex flexDir="column" gap="8">
        <Heading>Description</Heading>
        <Flex flexDir="column" fontSize="xl" gap="4">
          {data.description}
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
        <Bubble data={data.transactions} />
      </Flex>
    </Flex>
  );
};

export default CollectionPage;
