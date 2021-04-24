import { useMemo } from "react";
import createApolloClient from "./apolloClient";
import { ApolloCache, ApolloClient } from "@apollo/client";

let apolloClient: ApolloClient<any>;

export function initialiseApollo(initialState: ApolloCache<any> = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === "undefined") return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: ApolloCache<any>) {
  return useMemo(() => initialiseApollo(initialState), [initialState]);
}
