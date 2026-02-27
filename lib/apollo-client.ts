/**
 * Apollo Client singleton — safe for Next.js App Router client components.
 *
 * Uses a module-level singleton so `<ApolloProvider>` wraps the whole app
 * without creating multiple client instances during hot-reload.
 */
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { HttpLink } from "@apollo/client/link/http";

let _client: ApolloClient | undefined;

function createApolloClient() {
  return new ApolloClient({
    link: new HttpLink({
      // Use relative URL so it works in both browser (localhost) and Docker
      uri: "/api/graphql",
      // Forward credentials so NextAuth session cookies are included
      credentials: "same-origin",
    }),
    cache: new InMemoryCache(),
    devtools: { enabled: process.env.NODE_ENV === "development" },
  });
}

/**
 * Returns the shared Apollo Client.
 * Safe to call multiple times — returns the same instance.
 */
export function getApolloClient(): ApolloClient {
  if (typeof window === "undefined") {
    // Always create a fresh client on the server (no shared global)
    return createApolloClient();
  }
  // Reuse on the browser
  if (!_client) _client = createApolloClient();
  return _client!;
}
