import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

function createApolloClient() {
  return new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri: "/api/graphql",
      credentials: "include",
    }),
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;
