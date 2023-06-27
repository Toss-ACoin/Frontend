import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Router } from "@routes/Router";
import { CollectionServiceProvider } from "@services/CollectionService";
import { PaymentServiceProvider } from "@services/PaymentService";
import { SessionServiceProvider } from "@services/SessionService";
import { UserServiceProvider } from "@services/UserService";
import { rawTheme } from "@styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement, useState } from "react";

const theme = extendTheme(rawTheme);

const App = (): ReactElement => {
  const [client] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={theme}>
        <SessionServiceProvider>
          <UserServiceProvider>
            <CollectionServiceProvider>
              <PaymentServiceProvider>
                <Router />
              </PaymentServiceProvider>
            </CollectionServiceProvider>
          </UserServiceProvider>
        </SessionServiceProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
