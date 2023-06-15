import { QueryFunction } from "@tanstack/react-query";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import { SessionService, urlBase } from "./SessionService";

export type DonationData = {
  _id: string;
  value: number;
};

export type Collection = {
  title: string;
  goal: number;
  value: number;
  image: string[];
  description: string[];
  id: number;
  donation: DonationData[];
};

export type Collections = {
  title: string;
  goal: number;
  owner_name: string;
  image: Uint16Array[];
  owner_surname: string;
  id: number;
  fundraising_start: string;
  fundraising_end: string;
  collected_money: number;
};

type CollectionKey = ["collection", string] | ["collection"];
type CollectionListKey = ["collections", string] | ["collections"];

export type CollectionService = {
  collection: QueryFunction<Collection | undefined, CollectionKey>;
  collectionKey: (query?: string) => CollectionKey;
  collectionList: QueryFunction<Collections[] | undefined, CollectionListKey>;
  collectionListKey: (query?: string) => CollectionListKey;
};

export type CollectionServiceNullableValue =
  | {
      isInitialized: false;
    }
  | {
      isInitialized: true;
      value: CollectionService;
    };

export const CollectionService = createContext<CollectionServiceNullableValue>({
  isInitialized: false,
});

export const useCollectionService = (): CollectionService => {
  const context = useContext(CollectionService);

  if (!context.isInitialized) {
    throw new Error("CollectionService not defined");
  }

  return context.value;
};

export const getSessionQueryKey = (): string[] => {
  return ["session"];
};

type Props = {
  children: ReactNode;
};

export const CollectionServiceProvider = ({
  children,
}: Props): ReactElement => {
  const context = useContext(SessionService);
  const value = useMemo<CollectionServiceNullableValue>(() => {
    if (context.status !== "auth") {
      return { isInitialized: false };
    }
    return {
      isInitialized: true,
      value: {
        collection: async ({ queryKey }) => {
          const [, query] = queryKey;

          if (!query) {
            return undefined;
          }
          const response = await context.value.fetcher(
            `${urlBase}/fundraising?id=${query}`,
            {
              method: "GET",
              headers: {
                accept: "*/*",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );

          const result = await response.json();
          console.log(result);
          //const result = await Promise.resolve(getCollection(query));

          return result;
        },

        collectionKey: (query) => {
          return query ? ["collection", query] : ["collection"];
        },

        collectionList: async ({ queryKey }) => {
          const [, query] = queryKey;

          const response = await fetch(
            `${urlBase}/search?phrase=${query ? query : ""}`,
            {
              method: "GET",
              headers: {
                accept: "*/*",
                "Access-Control-Allow-Origin": "*",
              },
            }
          );

          const result = await response.json();

          //const result = await Promise.resolve(getCollection(query));

          return result.array;
        },
        collectionListKey: (query) => {
          return query ? ["collections", query] : ["collections"];
        },
      },
    };
  }, [context]);

  return (
    <CollectionService.Provider value={value}>
      {children}
    </CollectionService.Provider>
  );
};
