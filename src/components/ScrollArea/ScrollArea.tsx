import { BackgroundProps, chakra } from "@chakra-ui/react";
import * as CustomScroll from "@radix-ui/react-scroll-area";
import { ReactElement } from "react";

const Root = chakra(CustomScroll.Root);
const Viewport = chakra(CustomScroll.Viewport);
const Scrollbar = chakra(CustomScroll.Scrollbar);
const Thumb = chakra(CustomScroll.Thumb);

type Props = {
  children: ReactElement;
  thumbColor: BackgroundProps["bg"];
  isHorizontal?: boolean;
};

export const ScrollArea = ({
  children,
  thumbColor,
  isHorizontal,
}: Props): ReactElement => {
  return (
    <Root h="full" maxH="full" overflow="hidden" px="2" w="100%">
      <Viewport h="100%" w="100%">
        {children}
      </Viewport>
      <Scrollbar
        bg="transparent"
        borderColor="green.500"
        borderRadius="3"
        borderWidth="2px"
        display="flex"
        mx="2"
        my="2"
        orientation={isHorizontal ? "horizontal" : "vertical"}
        position="absolute"
        right="4"
        userSelect="none"
        w="2"
      >
        <Thumb bg={thumbColor} borderRadius="3" flex={1} position="relative" />
      </Scrollbar>
    </Root>
  );
};
