import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import { SessionService } from "./SessionService";

export type PaymentService = {
  //getToken: () => Promise<string>;
  sendPayment: () => Promise<void>;
};

export type PaymentServiceNullableValue =
  | {
      isInitialized: false;
    }
  | {
      isInitialized: true;
      value: PaymentService;
    };

export const PaymentService = createContext<PaymentServiceNullableValue>({
  isInitialized: false,
});

export const usePaymentService = (): PaymentService => {
  const context = useContext(PaymentService);

  if (!context.isInitialized) {
    throw new Error("PaymentService not defined");
  }

  return context.value;
};

type Props = {
  children: ReactNode;
};

const getToken = async () => {
  const bodyValue = {
    grant_type: "client_credentials",
    client_id: import.meta.env.VITE_PAYU_CLIENT_ID,
    client_secret: import.meta.env.VITE_PAYU_CLIENT_SECRET,
  };
  const response = await fetch(
    `https://secure.snd.payu.com/pl/standard/user/oauth/authorize`,

    {
      method: "POST",
      headers: {
        // accept: "*/*",
        //"Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(bodyValue),
    }
  );
  console.log(response);
  const result = await response.json();
  if (!response.ok) {
    throw new Error("error");
  }
  return Promise.resolve(result.access_token);
};

export const PaymentServiceProvider = ({ children }: Props): ReactElement => {
  const context = useContext(SessionService);
  const value = useMemo<PaymentServiceNullableValue>(() => {
    if (context.status !== "auth") {
      return { isInitialized: false };
    }
    return {
      isInitialized: true,
      value: {
        sendPayment: async () => {
          const bodyValue = {
            merchantPosId: "467060",
            description: "RTV market",
            currencyCode: "PLN",
            totalAmount: "21000",
            products: [
              {
                name: "Wireless Mouse for Laptop",
                unitPrice: "21000",
                quantity: "1",
              },
            ],
          };
          const token = await getToken();
          if (!token) {
            throw new Error("error");
          }
          const response = await fetch(
            `https://secure.payu.com/api/v2_1/orders`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(bodyValue),
            }
          );
          const result = await response.json();
          console.log(result);
          if (!response.ok) {
            throw new Error("error");
          }
          return Promise.resolve();
        },
      },
    };
  }, [context]);

  return (
    <PaymentService.Provider value={value}>{children}</PaymentService.Provider>
  );
};
