import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Label,
  Select,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import lp from "./assets/lp.png";

const CreateCollection = (): ReactElement => {
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
        backgroundColor="rgba(255,255,255,.9)"
        borderRadius="2xl"
        flexDir="column"
        gap="8"
        h="full"
        justifyContent="center"
        padding="200px"
        w="80%"
      >
        <Heading color="black">Create your Collection</Heading>
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input placeholder="Enter a title" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Select placeholder="Select a proper category">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Goal</FormLabel>
          <Input placeholder="Enter a title" type="number" />
        </FormControl>

        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input placeholder="Optional description of your collection" />
        </FormControl>

        <Button leftIcon={<AddPhotoAlternateIcon />} variant="solid">
          Add photo to your collection
          <Input
            accept="image/*"
            aria-hidden="true"
            height="100%"
            left="0"
            opacity="0"
            position="absolute"
            top="0"
            type="file"
            width="100%"
          />
        </Button>

        <Button
          _hover={{
            bgColor: "red.300",
          }}
          bg="red.500"
          color="white"
          fontSize="xl"
          px="7"
          py="2"
          transitionDuration="0.4s"
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  );
};
export default CreateCollection;
