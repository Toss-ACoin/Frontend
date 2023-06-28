import {
  Button,
  Checkbox,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactElement, useState } from "react";
import { PayPal } from "./PayPal/PayPal";

type Props = {
  name: string;
  collectionId: number;
};

export const Donation = ({ name, collectionId }: Props): ReactElement => {
  const [amount, setAmount] = useState<number>();
  const [isDisable, setIsDisable] = useState(true);
  const amountArray = [5, 10, 20, 50, 100, 200];
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button fontSize="3xl" h="16" onClick={onOpen}>
        DONATE
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="3xl">Donate to: {name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            alignItems="center"
            display="flex"
            flexDir="column"
            justifyContent="center"
          >
            <Flex
              alignItems="center"
              flexWrap="wrap"
              gap="8"
              justifyContent="center"
              py="16"
            >
              {amountArray.map((value, key) => {
                return (
                  <Button
                    _active={{
                      background: "red.500",
                      color: "white",
                    }}
                    _hover={{
                      background: "red.500",
                      color: "white",
                    }}
                    background="transparent"
                    borderColor="red.500"
                    borderRadius="xl"
                    borderWidth="1px"
                    color="red.500"
                    fontSize="3xl"
                    h="16"
                    isActive={amount === value}
                    key={key}
                    onClick={() => setAmount(value)}
                    w="40"
                  >
                    {value}zł
                  </Button>
                );
              })}
            </Flex>
            <Checkbox
              isChecked={!isDisable}
              onChange={() => setIsDisable((prev) => !prev)}
            >
              Accepts Toss A Coin and PayPal regulations
            </Checkbox>
          </ModalBody>

          <ModalFooter alignItems="center" justifyContent="center">
            <PayPal
              collectionId={collectionId}
              isDisable={isDisable}
              name={name}
              value={amount}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
