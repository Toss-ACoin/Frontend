import {
    Button,
    Box,
    Flex,
    Heading,
    Input,
    NumberInput,
    NumberInputField,
    Text
  } from "@chakra-ui/react";
  import { TopBar } from "@components/TopBar/TopBar";
  import { ReactElement } from "react";
  import lp from "./assets/lp.png";
  
  const AboutUs = (): ReactElement => {
    return (
      <>
        <TopBar />
        <Flex
          bgImage={lp}
          bgPosition="top"
          bgRepeat="no-repeat"
          bgSize="cover"
          h="calc(100vh - 80px)"
          w="full"
          justify="center"
        >
            <Flex
                alignItems="center"
                backgroundColor="rgba(0,0,0,.6)"
                flexDir="column"
                gap="8"
                h="full"
                justifyContent="center"
                padding="10px"
                borderRadius='2xl'
                w="80%">
                    <Heading color="white">About Us</Heading>
                    <Text color="white" fontsize="xl" textAlign="justify" padding="15px">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </Text>


            </Flex>

        </Flex>
      </>
    );
  };
  export default AboutUs;
  