import { Flex, Icon, Text } from "@chakra-ui/react";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { FilePreview } from "@services/CollectionService";
import { ReactElement } from "react";
import { useDropzone } from "react-dropzone";
import { Preview } from "./Preview/Preview";

type Props = {
  files?: FilePreview[];
  onFileUpload: (value: FilePreview[], isRemoving: boolean) => void;
};

export const FileGetter = ({ files, onFileUpload }: Props): ReactElement => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      onFileUpload(
        acceptedFiles.map((file) => {
          return {
            file,
            preview: URL.createObjectURL(file),
          };
        }),
        false
      );
    },
  });

  const removeFile = (file: FilePreview) => {
    const newFiles = files?.filter((currFile) => currFile !== file);
    if (newFiles) {
      onFileUpload(
        newFiles.map((currFile) => {
          return {
            file: currFile.file,
            preview: URL.createObjectURL(currFile.file),
          };
        }),
        true
      );
    }
  };

  // useEffect(() => {
  //   // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //   return () => files?.forEach((file) => URL.revokeObjectURL(file.preview));
  // }, []);

  return (
    <Flex flexDir="column" gap="4" w="full">
      <Flex
        borderColor="dark.100"
        borderRadius="lg"
        borderWidth="1px"
        flexDir="column"
        px="4"
        py="2"
        w="full"
      >
        <Flex
          {...getRootProps({ className: "dropzone" })}
          alignItems="center"
          flexDir="column"
          h="32"
          justifyContent="center"
          w="full"
        >
          <input {...getInputProps()} />
          <Icon as={ArrowUpwardRoundedIcon} boxSize="8" fill="dark.100" />
          <Text color="dark.100" fontWeight="semibold" textAlign="center">
            Upload pictures of your clothes, drag some files, or click to select
          </Text>
        </Flex>
      </Flex>
      {files && files.length > 0 && (
        <Preview files={files} removeFile={removeFile} />
      )}
    </Flex>
  );
};
