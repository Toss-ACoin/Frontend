import { Box, Flex, Icon, IconButton, Image } from "@chakra-ui/react";
import { ScrollArea } from "@components/ScrollArea/ScrollArea";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { FilePreview } from "@services/CollectionService";
import { ReactElement } from "react";

type Props = {
  files: FilePreview[];
  removeFile: (file: FilePreview) => void;
};

export const Preview = ({ files, removeFile }: Props): ReactElement => {
  return (
    <Flex
      borderColor="dark.100"
      borderRadius="lg"
      borderWidth="1px"
      h="64"
      py="2"
    >
      <ScrollArea thumbColor="green.500">
        <Flex
          alignItems="center"
          flexWrap="wrap"
          gap="4"
          justifyContent="center"
          maxH="80"
        >
          {files?.map((file, key) => {
            return (
              <Box key={key} position="relative">
                <IconButton
                  aria-label="remove"
                  bg="transparent"
                  icon={<Icon as={ClearRoundedIcon} fill="red.100" w="4" />}
                  minW="4"
                  onClick={() => removeFile(file)}
                  p="0"
                  position="absolute"
                  right="0"
                  w="4"
                />
                <Image src={file.preview} w="24" />
              </Box>
            );
          })}
        </Flex>
      </ScrollArea>
    </Flex>
  );
};
