import { Flex, Heading, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import lp from "./assets/lp.png";

const AboutUs = (): ReactElement => {
  return (
    <Flex
      bgImage={lp}
      bgPosition="top"
      bgRepeat="no-repeat"
      bgSize="cover"
      h="calc(100vh - 80px)"
      justify="center"
      w="full"
    >
      <Flex
        alignItems="center"
        backgroundColor="rgba(0,0,0,.6)"
        borderRadius="2xl"
        flexDir="column"
        gap="8"
        h="full"
        justifyContent="center"
        padding="10px"
        w="80%"
      >
        <Heading color="white">About Us</Heading>
        <Text color="white" fontSize="xl" padding="15px" textAlign="justify">
          {`Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.`}
        </Text>
      </Flex>
    </Flex>
  );
};
export default AboutUs;
