import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
} from "react";

export const urlBase = "https://toss-a-coin.azurewebsites.net";

export type AuthService = {
  signOut: () => Promise<void>;
  fetcher: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
};

export type AuthValue = {
  email: string;
  password: string;
};

export type RegistrationArgs = {
  date?: string;
  email: string;
  password: string;
  privacyPolicy?: boolean;
  name: string;
};

export type AnonService = {
  signIn: (value: AuthValue) => Promise<void>;
  signUp: (values: RegistrationArgs) => Promise<void>;
};

export type SessionServiceValue =
  | {
      status: "loading";
    }
  | {
      status: "auth";
      value: AuthService;
    }
  | {
      status: "anon";
      value: AnonService;
    };

export type SessionServiceState =
  | {
      authorization: string;
      status: "auth";
      role: string;
    }
  | {
      status: "anon";
    };

export const SessionService = createContext<SessionServiceValue>({
  status: "loading",
});

export const useAuthService = (): AuthService => {
  const context = useContext(SessionService);

  if (context.status !== "auth") {
    throw new Error("AuthService not defined");
  }

  return context.value;
};

export const useAnonService = (): AnonService => {
  const context = useContext(SessionService);

  if (context.status !== "anon") {
    throw new Error("AnonService not defined");
  }

  return context.value;
};

export const useSessionStatus = (): SessionServiceValue["status"] => {
  const context = useContext(SessionService);

  return context.status;
};

export const getSessionQueryKey = (): string[] => {
  return ["session"];
};

type Props = {
  children: ReactNode;
};

export const SessionServiceProvider = ({ children }: Props): ReactElement => {
  const client = useQueryClient();
  const { data } = useQuery(
    getSessionQueryKey(),
    (): Promise<SessionServiceState> => {
      const authorization = localStorage.getItem("authorization");
      const role = localStorage.getItem("role");

      return Promise.resolve(
        authorization && role
          ? {
              status: "auth",
              authorization: authorization,
              role: role,
            }
          : { status: "anon" }
      );
    },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const value = useMemo<SessionServiceValue>(() => {
    switch (data?.status) {
      case "anon":
        return {
          status: "anon",
          value: {
            signIn: async (value) => {
              const str =
                "Basic " +
                window.btoa(
                  unescape(
                    encodeURIComponent(value.email + ":" + value.password)
                  )
                );
              const response = await fetch(`${urlBase}/loginBasic`, {
                method: "GET",
                headers: {
                  accept: "*/*",
                  Authorization: str,
                },
              });
              const result = await response.json();
              if (!response.ok || !result) {
                throw new Error(result.error);
              }
              localStorage.setItem("authorization", str);
              localStorage.setItem("role", result.user_role[0].authority);
              client.setQueryData<SessionServiceState>(getSessionQueryKey(), {
                status: "auth",
                authorization: str,
                role: result.user_role[0].authority,
              });
              return Promise.resolve();
            },

            signUp: async (value) => {
              const response = await fetch(`${urlBase}/register`, {
                method: "POST",
                headers: {
                  accept: "*/*",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ value }),
              });
              const result = await response.json();
              if (!response.ok || !result.User) {
                throw new Error(result.error);
              }
              const str =
                "Basic " +
                window.btoa(
                  unescape(
                    encodeURIComponent(value.email + ":" + value.password)
                  )
                );
              localStorage.setItem("authorization", str);
              localStorage.setItem("role", result.user_role[0].authority);
              client.setQueryData<SessionServiceState>(getSessionQueryKey(), {
                status: "auth",
                authorization: str,
                role: result.user_role[0].authority,
              });

              return Promise.resolve();
            },
          },
        };
      case "auth":
        return {
          status: "auth",
          value: {
            signOut: () => {
              localStorage.removeItem("authorization");
              client.setQueryData<SessionServiceState>(getSessionQueryKey(), {
                status: "anon",
              });
              return Promise.resolve();
            },
            fetcher: async (input, init) => {
              const authorizationToken = data?.authorization;
              if (!authorizationToken) {
                throw new Error("No authorization token");
              }

              const response = await window.fetch(input, {
                ...init,
                headers: {
                  ...init?.headers,
                  Authorization: authorizationToken,
                },
              });

              if (response.status === 401) {
                localStorage.removeItem("authorization");
                client.setQueryData<SessionServiceState>(getSessionQueryKey(), {
                  status: "anon",
                });

                throw new Error("Token timeout");
              }

              return response;
            },
          },
        };
      default:
        return { status: "loading" };
    }
  }, [data, client]);

  return (
    <SessionService.Provider value={value}>{children}</SessionService.Provider>
  );
};
