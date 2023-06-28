import {
  Box,
  Button,
  Flex,
  Heading,
  Highlight,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Progress,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useDebounce } from "@hooks/useDebounce";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useCollectionService } from "@services/CollectionService";
import { useQuery } from "@tanstack/react-query";
import { paths } from "@utils/paths";
import { ReactElement, useEffect, useState, useTransition } from "react";
import { Link, useNavigate } from "react-router-dom";

const Collections = (): ReactElement => {
  const navigate = useNavigate();
  const collectionService = useCollectionService();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState<number[]>([]);
  const [isPending, startTransition] = useTransition();
  const debouncedSetQueryFilter = useDebounce(
    (query: string) =>
      startTransition(() => {
        setQuery(query);
      }),
    1000
  );
  const { data, status, isLoading } = useQuery(
    collectionService.collectionListKey({ query, page }),
    collectionService.collectionList
  );

  useEffect(() => {
    if (data) {
      const array: number[] = new Array(data.pages);
      for (let i = 0; i < array.length; i++) {
        array[i] = i + 1;
      }
      setPages(array);
    }
  }, [data]);

  return (
    <Flex alignItems="center" flexDir="column" pb="16">
      <InputGroup
        alignItems="center"
        display="flex"
        justifyContent="center"
        my="6"
        w="30%"
      >
        <InputLeftElement>
          <SearchOutlinedIcon />
        </InputLeftElement>

        <Input
          _hover={{
            borderColor: "green.500",
          }}
          borderColor="green.300"
          borderWidth="2px"
          disabled={isPending}
          fontSize="md"
          fontWeight="semibold"
          onChange={(e) => {
            setSearch(e.target.value);
            debouncedSetQueryFilter(e.target.value);
          }}
          value={search}
        />
      </InputGroup>

      {status === "loading" ? (
        <Spinner size="xl" />
      ) : status === "error" || !data ? (
        <Box>Error</Box>
      ) : data.array.length <= 0 ? (
        <Flex alignItems="center" h="full" justifyContent="center" w="full">
          <Flex
            borderRadius="lg"
            boxShadow="md"
            flexDir="column"
            gap="4"
            p="32"
            w="35%"
          >
            <Icon as={SearchOffOutlinedIcon} color="red.500" h="20" w="full" />

            <Text
              fontSize="2xl"
              fontWeight="semibold"
              noOfLines={3}
              textAlign="center"
            >
              <Highlight
                query={query}
                styles={{ fontWeight: "bold", color: "green.500" }}
              >
                {`Sorry we couldn't find any matches for ${query}`}
              </Highlight>
            </Text>

            <Link to={paths.create}>
              <Box
                _hover={{
                  bgColor: "green.300",
                }}
                bgColor="green.400"
                borderRadius="md"
                color="white"
                fontSize="xl"
                fontWeight="semibold"
                noOfLines={2}
                px="4"
                py="2"
                textAlign="center"
              >
                <Highlight
                  query="collections"
                  styles={{ fontWeight: "bold", color: "red.300" }}
                >
                  Create your collections
                </Highlight>
              </Box>
            </Link>
          </Flex>
        </Flex>
      ) : (
        <SimpleGrid
          columnGap="8"
          gap="8"
          h="full"
          justifyItems="center"
          minChildWidth="72"
          px={{ base: "24", xl: "80" }}
          py="8"
          templateRows="24rem"
          w="full"
        >
          {data.array.map((item, key) => {
            const endsIn =
              new Date(item.fundraising_end).getTime() - new Date().getTime();
            console.log(endsIn);

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
                onClick={() => navigate(paths.collection(item.id))}
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
                    {item.collected_money}zł of {item.goal}zł
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
          })}
        </SimpleGrid>
      )}
      {!isLoading && data && (
        <Flex flexDir="row" gap="3">
          {pages.map((value, key) => {
            return (
              <Button
                key={key}
                onClick={() => setPage(key)}
                variant="secondary"
              >
                {value}
              </Button>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};
export default Collections;
