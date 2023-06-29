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
import { FileGetter } from "@components/FileGetter/FileGetter";
import { FilePreview, useCollectionService } from "@services/CollectionService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { paths } from "@utils/paths";
import { useFormik } from "formik";
import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import lp from "./assets/lp.png";

const CreateCollection = (): ReactElement => {
  const collectionService = useCollectionService();
  const toast = useToast();

  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<FilePreview[]>();
  const handleFileUpload = (value: FilePreview[], isRemoving: boolean) => {
    if (isRemoving) {
      setFiles(value);
      return;
    }

    setFiles((prev) => (prev ? prev.concat(value) : value));
  };

  const { data } = useQuery(
    collectionService.categoryKey(),
    collectionService.getCategory
  );

  const handleImageArray = (files: FilePreview[]): File[] => {
    const filesArray = files.map((file) => {
      return file.file;
    });

    return filesArray;
  };

  const { mutate } = useMutation(collectionService.addCollection);
  const navigate = useNavigate();

  const collection = useFormik({
    initialValues: {
      title: "",
      category: "",
      goal: 2000,
      description: "",
      date: "",
    },
    onSubmit: (values) => {
      const image = files ? handleImageArray(files) : [];

      mutate(
        { ...values, image },
        {
          onError: () => {
            toast({
              status: "error",
              description: "Something went wrong",
              title: "Error :(",
            });
          },
          onSuccess: () => {
            toast({
              status: "success",
              description: "Your collection has been added",
              title: "Whooo!",
            });
            navigate(paths.collections);
          },
        }
      );
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
          {step === 0 ? (
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
                  {data?.map((value, key) => {
                    return (
                      <option key={key} value={value}>
                        {value}
                      </option>
                    );
                  })}
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
              <FormControl isRequired>
                <FormLabel>End date</FormLabel>
                <Input
                  id="date"
                  name="date"
                  onChange={collection.handleChange}
                  type="date"
                  value={collection.values.date}
                />
              </FormControl>
              <Button
                _hover={{
                  bgColor: "red.300",
                }}
                bg="red.500"
                color="white"
                fontSize="xl"
                onClick={() => setStep(1)}
                px="7"
                py="2"
                transitionDuration="0.4s"
              >
                Next
              </Button>
            </Flex>
          ) : (
            <Flex flexDir="column" gap="4" w="500px">
              <FileGetter files={files} onFileUpload={handleFileUpload} />
              <Flex justifyContent="space-between">
                <Button
                  _hover={{
                    bgColor: "red.300",
                  }}
                  bg="red.500"
                  color="white"
                  fontSize="xl"
                  onClick={() => setStep(0)}
                  px="7"
                  py="2"
                  transitionDuration="0.4s"
                >
                  Back
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
            </Flex>
          )}
        </form>
      </Flex>
    </Flex>
  );
};
export default CreateCollection;
