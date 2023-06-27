import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "semibold",
  },
  variants: {
    primary: {
      backgroundColor: "red.500",
      color: "white",
      _hover: {
        backgroundColor: "red.300",
      },
    },
    secondary: {
      backgroundColor: "green.400",
      borderRadius: "full",
      color: "white",
      hover: {
        backgroundColor: "green.500",
      },
    },
  },
  defaultProps: {
    variant: "primary",
  },
};
