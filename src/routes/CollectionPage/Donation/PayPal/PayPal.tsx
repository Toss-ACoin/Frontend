import { useToast } from "@chakra-ui/react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useCollectionService } from "@services/CollectionService";
import { useMutation } from "@tanstack/react-query";
import { ReactElement } from "react";

type Props = {
  value?: number;
  name: string;
  isDisable: boolean;
  collectionId: number;
};

export const PayPal = ({
  value,
  name,
  isDisable,
  collectionId,
}: Props): ReactElement => {
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  const currency = "PLN";
  const collectionService = useCollectionService();
  const toast = useToast();
  const { mutate } = useMutation(collectionService.donate);
  return (
    <PayPalScriptProvider
      options={{
        clientId: clientId,
        components: "buttons",
        currency: currency,
      }}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  description: name,
                  amount: {
                    currency_code: currency,
                    value: value ? value.toString() : "0",
                  },
                },
              ],
            })
            .then((orderId) => orderId);
        }}
        disabled={!value || isDisable}
        forceReRender={[currency, value]}
        onApprove={(data, actions) => {
          if (actions.order) {
            return actions.order.capture().then(() => {
              if (value) {
                mutate(
                  { collectionId, amount: value },
                  {
                    onSuccess: () => {
                      toast({
                        status: "success",
                        description: `Whooo u donate ${value}zł to ${name}`,
                        title: "Success <3",
                      });
                    },
                  }
                );
              }
            });
          }
          throw new Error("error");
        }}
        style={{
          height: 40,
          color: "white",
          layout: "horizontal",
        }}
      />
    </PayPalScriptProvider>
  );
};
