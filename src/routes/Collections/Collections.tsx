import {
  Box,
  Flex,
  Heading,
  Highlight,
  Image,
  Progress,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useCollectionService } from "@services/CollectionService";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";

const Collections = (): ReactElement => {
  const collectionService = useCollectionService();

  const { data, status } = useQuery(
    collectionService.collectionListKey("collections"),
    collectionService.collectionList
  );
  if (status === "loading") {
    return <Spinner size="xl" />;
  }
  if (status === "error" || !data) {
    return <Box>Error</Box>;
  }

  return (
    <SimpleGrid
      columnGap="8"
      gap="8"
      h="full"
      justifyItems="center"
      minChildWidth="72"
      px="32"
      py="8"
      templateRows="24rem"
      w="full"
    >
      {data.map((item, key) => {
        const endsIn =
          new Date(item.fundraising_end).getTime() - new Date().getTime();
        if (endsIn > 0) {
          return (
            <Flex
              _hover={{
                zIndex: "10",
                height: "30rem",
                bgColor: "green.100",

                h2: {
                  "--chakra-line-clamp": "3",
                  color: "white",
                },
                img: {
                  transform: "scale(1.2)",
                },
                p: {
                  color: "white",
                  display: "block",
                },
                ".progress": {
                  h: "5",
                },
              }}
              bg="white"
              borderColor="dark.100"
              borderRadius="lg"
              borderWidth="2px"
              cursor="pointer"
              flexDir="column"
              height="96"
              key={key}
              overflow="hidden"
              transitionDuration="0.5s"
              w="72"
            >
              <Image
                borderTopRadius="md"
                h="48"
                src="../assets/img.png"
                transitionDuration="0.5s"
              />
              <Flex
                flexDir="column"
                h="full"
                justifyContent="space-between"
                px="4"
                py="8"
              >
                <Heading
                  color="black"
                  noOfLines={1}
                  size="lg"
                  transition="--chakra-line-clamp 0.4s, color 0s"
                >
                  {item.title}
                </Heading>
                <Progress
                  borderRadius="lg"
                  className="progress"
                  colorScheme="red"
                  h="3"
                  transitionDuration="0.5s"
                  value={(item.collected_money / item.goal) * 100}
                />
                <Text display="none" transitionDuration="0.5s">
                  <Highlight
                    query={`${(
                      (item.collected_money / item.goal) *
                      100
                    ).toFixed(2)}%`}
                    styles={{ color: "red.300", fontWeight: "bold" }}
                  >
                    {`${((item.collected_money / item.goal) * 100).toFixed(
                      2
                    )}%`}
                  </Highlight>
                </Text>
                <Text color="black" fontSize="xl" fontWeight={"bold"}>
                  {item.collected_money}$ of {item.goal}$
                </Text>
                <Text
                  display="none"
                  fontWeight="semibold"
                  transitionDuration="0.5s"
                >
                  <Highlight
                    query={Math.ceil(endsIn / (1000 * 3600 * 24)).toString()}
                    styles={{ color: "red.300", fontWeight: "bold" }}
                  >
                    {`Ends in ${Math.ceil(endsIn / (1000 * 3600 * 24))} days`}
                  </Highlight>
                </Text>
              </Flex>
            </Flex>
          );
        }
      })}
    </SimpleGrid>
  );
};
export default Collections;
