import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  useToast,
} from "@chakra-ui/react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useCollectionService } from "@services/CollectionService";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { ReactElement } from "react";
import lp from "./assets/lp.png";

const CreateCollection = (): ReactElement => {
  const collectionService = useCollectionService();
  const toast = useToast();
  const { mutate } = useMutation(collectionService.addCollection);
  const collection = useFormik({
    initialValues: {
      title: "",
      category: "",
      goal: "",
      description: "",
      image: "",
    },
    onSubmit: (values) => {
      mutate(values, {
        onError: () => {
          toast({
            status: "error",
            description: "Something went wrong",
            title: "Error :(",
          });
        },
      });
    },
  });

  return (
    <Flex
      bgImage={lp}
      bgPosition="top"
      bgRepeat="no-repeat"
      bgSize="cover"
      h="full"
      justify="center"
      w="full"
    >
      <Flex
        alignItems="center"
        alignSelf="center"
        backgroundColor="rgba(255,255,255, 0.95)"
        borderRadius="2xl"
        flexDir="column"
        gap="8"
        h="90%"
        justifyContent="center"
        padding="100px"
        w="60%"
      >
        <Heading color="black">Create your Collection</Heading>
        <form onSubmit={collection.handleSubmit}>
          <Flex flexDir="column" gap="4" w="500px">
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                id="title"
                name="title"
                onChange={collection.handleChange}
                placeholder="Enter a title"
                value={collection.values.title}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Category</FormLabel>
              <Select
                id="category"
                name="category"
                onChange={collection.handleChange}
                placeholder="Select a proper category"
                value={collection.values.category}
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Goal</FormLabel>
              <Input
                id="goal"
                name="goal"
                onChange={collection.handleChange}
                placeholder="Enter your goal"
                type="number"
                value={collection.values.goal}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                id="description"
                name="description"
                onChange={collection.handleChange}
                placeholder="Optional description of your collection"
                value={collection.values.description}
              />
            </FormControl>

            <Button leftIcon={<AddPhotoAlternateIcon />} variant="solid">
              Add photo to your collection
              <Input
                accept="image/*"
                aria-hidden="true"
                height="100%"
                id="image"
                left="0"
                name="image"
                onChange={collection.handleChange}
                opacity="0"
                position="absolute"
                top="0"
                type="file"
                value={collection.values.image}
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
              type="submit"
            >
              Submit
            </Button>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};
export default CreateCollection;
