"use client";

import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { ApolloProvider } from "@apollo/client/react";
import { store } from "@/store";
import { getApolloClient } from "@/lib/apollo-client";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={getApolloClient()}>
      <ReduxProvider store={store}>
        <SessionProvider>{children}</SessionProvider>
      </ReduxProvider>
    </ApolloProvider>
  );
}
