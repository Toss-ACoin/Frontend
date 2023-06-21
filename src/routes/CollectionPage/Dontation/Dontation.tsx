import { ReactElement } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export const Dontation = (): ReactElement => {
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
  console.log(clientId);
  const currency = "PLN";
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
                  description: "fundID1",
                  amount: {
                    currency_code: currency,
                    value: "20",
                  },
                },
              ],
            })
            .then((orderId) => orderId);
        }}
        forceReRender={[currency]}
        onApprove={(data, actions) => {
          if (actions.order) {
            return actions.order.capture().then((details) => {
              const name = details.payer.name?.given_name;
              alert(`Transaction completed by ${name}`);
            });
          }
          throw new Error("error");
        }}
        style={{ layout: "horizontal" }}
      />
    </PayPalScriptProvider>
  );
};
