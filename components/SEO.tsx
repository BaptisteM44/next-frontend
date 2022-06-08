import { useRouter } from "next/router";
import Head from "next/head";

export type SEOProps = {
  title: string;
  description: string;
  imageUrl?: string;
};

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  imageUrl = "https://blooms.fuelthemes.net/wp-content/uploads/2022/02/m1-2.jpg?w=640",
}) => {
  const router = useRouter();

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta content="@totominc" name="twitter:site" />
      <meta content="@totominc" name="twitter:creator" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={imageUrl} name="twitter:image" />

      <meta content={title} property="og:title" />
      <meta
        content={`https://blooms-co.totominc.io${router.asPath}`}
        property="og:url"
      />
      <meta content={description} property="og:description" />
      <meta content={imageUrl} property="og:image" />

      <meta content="#fff" name="theme-color" />
    </Head>
  );
};

export default SEO;
