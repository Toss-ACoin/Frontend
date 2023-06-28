import { Flex, Heading, Link, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import Policy from "../../../public/docs/Policy.pdf";
import Regulations from "../../../public/docs/Regulations.pdf";
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
        gap="4"
        h="full"
        justifyContent="center"
        padding="10px"
        py="16"
        w="80%"
      >
        <Heading color="white">About Us</Heading>
        <Text color="white" fontSize="xl" padding="15px" textAlign="justify">
          {`At TossACoin, we are passionate about making a positive difference in the lives of animals.
          We believe that every animal deserves love, care, and a chance at a happy and healthy life.
          Our mission is to support animal welfare causes through fundraising initiatives and community engagement.`}
        </Text>
        <Text
          as="b"
          color="white"
          fontSize="2xl"
          padding="10px"
          textAlign={"left"}
        >
          {`What We Do:`}
        </Text>
        <Text color="white" fontSize="xl" padding="10px" textAlign="justify">
          {`Fundraising: We organize various fundraising campaigns and events to raise financial support for animal shelters,
          rescue organizations, and other initiatives dedicated to animal welfare. Your generous donations help provide food,
          medical care, shelter, and other necessities for animals in need.`}
        </Text>
        <Text color="white" fontSize="xl" padding="10px" textAlign="justify">
          {`Advocacy: We advocate for animal rights and work towards creating a compassionate society that values and 
          protects all animals. We strive to raise awareness about animal cruelty, 
          promote responsible pet ownership, and support legislation that safeguards animal welfare.`}
        </Text>
        <Text color="white" fontSize="xl" padding="10px" textAlign="justify">
          {`Community Engagement: We actively engage with our community to foster a sense of compassion and responsibility 
          towards animals. Through educational programs, workshops, and awareness campaigns, 
          we aim to inspire and empower individuals to make a positive impact on animal lives.`}
        </Text>
        <Text color="white" fontSize="xl" padding="10px" textAlign="justify">
          {`Collaboration: We collaborate with local animal shelters, rescue groups, and like-minded 
          organizations to maximize our collective impact. By working together, we can reach more animals in need, 
          share resources and expertise, and create a stronger support network for animal welfare.`}
        </Text>
        <Text
          as="b"
          color="white"
          fontSize="xl"
          padding="10px"
          textAlign="justify"
        >
          <Link href={Regulations} target="_blank">
            Our Regulations
          </Link>
        </Text>
        <Text
          as="b"
          color="white"
          fontSize="xl"
          padding="10px"
          textAlign="justify"
        >
          <Link href={Policy} target="_blank">
            Our Policy
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
};
export default AboutUs;
