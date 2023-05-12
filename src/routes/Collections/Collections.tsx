import { Box } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import {
  Flex,
  Heading,
  Text,
  Card,
  Stack,
  CardBody,
  Progress,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";
import { TopBar } from "@components/TopBar/TopBar";
import { useCollectionService } from "@services/CollectionService";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";

const Collections = (): ReactElement => {
  // const data: any = [
  //   { id: 1, title: "title1" },
  //   { id: 2, title: "title2" },
  //   { id: 3, title: "title3" },
  //   { id: 4, title: "title4" },
  //   { id: 5, title: "title5" },
  //   { id: 6, title: "title6" },
  //   { id: 7, title: "title7" },
  //   { id: 8, title: "title8" },
  // ];

  const collectionService = useCollectionService();

  const { data, status } = useQuery(
    collectionService.collectionListKey(),
    collectionService.collectionList
  );
  if (status === "loading") {
    return (<Spinner size="xl"/>);
  }
  if (status === "error") {
    return <Box>Error</Box>;
  }
  return (
    <>
      <TopBar />
      <Flex
        bg="dark.400"
        h="full"
        justifyContent="center"
        padding="10px"
        w="full"
      >
        <SimpleGrid columns={4} spacingX="40px" spacingY="20px">
          {data?.map((item, key) => {
            return (
              <Card height={"450px"} key={key} maxW="sm">
                <CardBody>
                  <Image src="../assets/img.png" />
                  <Stack mt="6" spacing="3">
                    <Heading size="xl">Lorem ipsum</Heading>
                    <Progress
                      borderRadius="lg"
                      colorScheme="red"
                      h="3"
                      value={20}
                    />
                    <Text color="black" fontSize="xl" fontWeight={"bold"}>
                      2000$ of 10000$
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
            );
          })}
        </SimpleGrid>
      </Flex>
    </>
  );
};
export default Collections;
