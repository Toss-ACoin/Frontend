import { Flex, Text } from "@chakra-ui/react";
import { DonationData } from "@services/CollectionService";
import { ReactElement } from "react";

type Props = {
  data: DonationData[];
};
export const Bubble = ({ data }: Props): ReactElement => {
  return (
    <>
      {!data ? (
        <Text>You can be first who donates</Text>
      ) : (
        data.map((value, key) => {
          const numberOfPayments = Number(value.numberOfPayments);
          return (
            <Flex
              alignItems="center"
              backgroundColor="green.300"
              borderRadius="full"
              height={`${numberOfPayments * 3}px`}
              justifyContent="center"
              key={key}
              minH="16"
              minW="16"
              px="4"
              py="4"
              width={`${numberOfPayments * 3}px`}
            >
              <Text
                fontSize={
                  numberOfPayments > 99
                    ? "3xl"
                    : numberOfPayments > 50
                    ? "xl"
                    : "md"
                }
                fontWeight={
                  numberOfPayments > 99
                    ? "bold"
                    : numberOfPayments > 50
                    ? "semibold"
                    : "medium"
                }
              >
                {value.name}
              </Text>
            </Flex>
          );
        })
      )}
    </>
  );
};
