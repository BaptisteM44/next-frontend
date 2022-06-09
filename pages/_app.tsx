import type { AppProps } from "next/app";

import "../styles/global.css";

import { SnipcartScript } from "@/components/SnipcartScript";
import Layout from "@/components/Layout";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <SnipcartScript />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
