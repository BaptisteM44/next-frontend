import type { AppProps } from "next/app";
import Head from "next/head";

import "../styles/global.css";

import SnipcartScript from "@/components/SnipcartScript";
import Layout from "@/components/Layout";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <SnipcartScript />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
