/**
 * POST /api/graphql — Apollo Server v4 handler for Next.js App Router.
 *
 * Usage (client):
 *   const client = getApolloClient(); // from lib/apollo-client.ts
 *   const { data } = await client.query({ query: DASHBOARD_QUERY, variables: { date: '2026-02-26' } });
 *
 * Playground: POST http://localhost:3000/api/graphql
 *   { "query": "{ dashboard { summary { calories protein carbs fat } } }" }
 */
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { typeDefs } from "@/graphql/schema";
import { resolvers } from "@/graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // Introspection enabled — useful for tooling / docs in all envs
  introspection: true,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };
