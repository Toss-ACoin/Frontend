import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import { SessionService, urlBase } from "./SessionService";

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
  const response = await fetch(
    `${urlBase}/accessToken`,

    {
      method: "GET",
      headers: {
        accept: "*/*",
      },
    }
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error("error");
  }
  return Promise.resolve(result.token);
};

const getIp = async () => {
  const response = await fetch(`https://geolocation-db.com/json/`, {
    method: "GET",
    headers: {
      accept: "*/*",
    },
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error("error");
  }
  return Promise.resolve(result.IPv4);
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
          const ip = await getIp();
          const bodyValue = {
            customerIp: ip,
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
            `https://secure.snd.payu.com/api/v2_1/orders`,
            {
              method: "POST",
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Accept-Encoding": "gzip, deflate, br",
                Connection: "keep-alive",
                Accept: "*/*",
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
