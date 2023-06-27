import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import { SessionService, urlBase } from "./SessionService";

export type UserService = {
  getUserDate: () => Promise<void>;
  getUserCollections: () => Promise<void>;
};

export type UserServiceNullableValue =
  | {
      isInitialized: false;
    }
  | {
      isInitialized: true;
      value: UserService;
    };

export const UserService = createContext<UserServiceNullableValue>({
  isInitialized: false,
});

export const useUserService = (): UserService => {
  const context = useContext(UserService);

  if (!context.isInitialized) {
    throw new Error("UserService not defined");
  }

  return context.value;
};

type Props = {
  children: ReactNode;
};

export const UserServiceProvider = ({ children }: Props): ReactElement => {
  const context = useContext(SessionService);
  const value = useMemo<UserServiceNullableValue>(() => {
    if (context.status !== "auth") {
      return { isInitialized: false };
    }
    return {
      isInitialized: true,
      value: {
        getUserDate: async () => {
          const response = await context.value.fetcher(`${urlBase}/myAccount`, {
            method: "GET",
          });
          const result = await response.json();
          if (!response.ok || !result) {
            throw new Error("Something went wrong");
          }
          console.log(result);
          return Promise.resolve();
        },
        getUserCollections: async () => {
          const response = await context.value.fetcher(
            `${urlBase}/myFundraising`,
            {
              method: "GET",
            }
          );
          const result = await response.json();
          if (!response.ok || !result) {
            throw new Error("Something went wrong");
          }
          console.log(result);
          return Promise.resolve();
        },
      },
    };
  }, [context]);

  return <UserService.Provider value={value}>{children}</UserService.Provider>;
};
