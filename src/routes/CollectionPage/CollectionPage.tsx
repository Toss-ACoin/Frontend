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
import photo from "./assets/img.png";
import { ImgCarousel } from "./ImgCarousel/ImgCarousel";
import { Dontation } from "./Dontation/Dontation";

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
            <Highlight query={`${data.goal}$`} styles={{ fontWeight: "bold" }}>
              {`${data.collected_money}$ of ${data.goal}$`}
            </Highlight>
          </Text>
          <Progress borderRadius="lg" colorScheme="red" h="9" value={20} />
          <Button fontSize="3xl" h="16">
            DONATE
          </Button>
          <Dontation />
        </Flex>
      </Flex>
      <Flex flexDir="column" gap="8">
        <Heading>Description</Heading>
        <Flex flexDir="column" fontSize="xl" gap="4">
          {data?.description.length < 100
            ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
            : data.description}
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
        <Bubble
          data={
            !data.donation
              ? [
                  { _id: "5", value: 20 },
                  { _id: "50", value: 50 },
                  { _id: "1", value: 5 },
                  { _id: "2", value: 20 },
                  { _id: "100", value: 20 },
                ]
              : data.donation
          }
        />
      </Flex>
    </Flex>
  );
};

export default CollectionPage;
