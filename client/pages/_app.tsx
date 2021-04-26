import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import NextHead from "next/head";
import { GoogleFonts } from "next-google-fonts";
import { Provider } from "react-redux";

import { useApollo } from "../lib/apollo";
import Navbar from "../components/layout/Navbar";
import store from "../store/store";

import "../styles/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <GoogleFonts
          href={
            "https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&display=swap"
          }
        />
        <NextHead>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>Spaghetti Tools</title>
        </NextHead>
        <Navbar />
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}

export default MyApp;
