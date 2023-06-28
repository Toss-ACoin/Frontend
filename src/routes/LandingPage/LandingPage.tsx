import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import lp from "./assets/lp.png";

export const LandingPage = (): ReactElement => {
  const navigate = useNavigate();
  return (
    <Flex
      bgImage={lp}
      bgPosition="top"
      bgRepeat="no-repeat"
      bgSize="cover"
      h="calc(100vh - 80px)"
      w="full"
    >
      <Flex
        alignItems="center"
        flexDir="column"
        gap="4"
        h="full"
        justifyContent="center"
        w="full"
      >
        <Heading color="white">Create your collection now</Heading>
        <Button
          _hover={{
            bgColor: "red.300",
          }}
          bg="red.500"
          border="1px"
          borderColor="dark.400"
          color="white"
          fontSize="3xl"
          h="fit-content"
          onClick={() => navigate(paths.create)}
          px="8"
          py="4"
          transitionDuration="0.4s"
          w="fit-content"
        >
          <Text h="fit-content" w="full">
            Set up a collection
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
};
