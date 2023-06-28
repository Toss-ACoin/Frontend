import { QueryFunction } from "@tanstack/react-query";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import { Collection } from "./CollectionService";
import { SessionService, urlBase } from "./SessionService";

export type User = {
  bank_number: string;
  role: string;
  blocked: boolean;
  birth_date: string;
  phone: string;
  surname: string;
  name: string;
  funds: Collection[];
  id: number;
  email: string;
};

type UserKey = ["user", string] | ["user"];

export type UserService = {
  getUserDate: () => Promise<void>;
  getUserCollections: () => Promise<void>;
  getUserList: QueryFunction<User[] | undefined, UserKey>;
  userListKey: (query?: string) => UserKey;
  toggleUserBlock: (value: number) => Promise<void>;
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
          if (!response.ok) {
            throw new Error("Something went wrong");
          }

          return Promise.resolve();
        },
        getUserCollections: async () => {
          const response = await context.value.fetcher(
            `${urlBase}/myFundraising`,
            {
              method: "GET",
            }
          );

          if (!response.ok) {
            throw new Error("Something went wrong");
          }
          return Promise.resolve();
        },
        userListKey: (query) => {
          return query ? ["user", query] : ["user"];
        },
        getUserList: async ({ queryKey }) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [, query] = queryKey;

          const response = await context.value.fetcher(
            `${urlBase}/admin/users`,
            {
              method: "GET",
              headers: {
                accept: "*/*",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );

          const result = await response.json();

          return result.users;
        },
        toggleUserBlock: async (value) => {
          const response = await context.value.fetcher(
            `${urlBase}/admin/user?id=${value}`,
            {
              method: "PATCH",
            }
          );
          if (!response.ok) {
            throw new Error("Error");
          }
          return Promise.resolve();
        },
      },
    };
  }, [context]);

  return <UserService.Provider value={value}>{children}</UserService.Provider>;
};
