import type { NextPage, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowNarrowRightIcon } from "@heroicons/react/solid";

import type { ProductCard } from "@/types/ProductTypes";
import ImageHeaderSrc from "@/public/images/homepage-header.jpg";
import { getAllFeaturedProducts } from "@/lib/api";
import { toProductCard } from "@/lib/apiCleaner";
import SEO from "@/components/SEO";
import ProductCards from "@/components/product/ProductCards/ProductCards";

type HomePageProps = {
  featuredProducts: ProductCard[];
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const featuredProducts = await getAllFeaturedProducts().then(
    (allFeaturedProducts) =>
      allFeaturedProducts.map((product) => toProductCard(product.attributes))
  );

  return { props: { featuredProducts } };
};

const Home: NextPage<HomePageProps> = ({ featuredProducts }) => {
  return (
    <>
      <SEO
        title=" Blooms Co. — Roses, lilies, tulips and more flowers."
        description="We offer a wide variety of flowers for everyone. From roses to lilies, tulips, and daisies there is no reason to buy your flowers anywhere else."
      />

      <main className="relative h-[500px] w-full">
        <Image
          src={ImageHeaderSrc}
          alt="Front of a flower shop"
          layout="fill"
          objectFit="cover"
          sizes="100vw"
          quality={70}
        />

        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-end justify-start bg-black bg-opacity-40">
          <div className="h-auto w-full lg:mx-auto lg:max-w-[1200px]">
            <div className="relative w-full max-w-[550px] px-8 pb-16">
              <h1 className="mb-4 font-display text-4xl font-medium text-white">
                Plants made easy
              </h1>

              <p className="mb-8 text-base text-white">
                Whether you are looking for flowers for birthdays,
                anniversaries, or simply a relaxing occasion you will find it
                here at our shop.
              </p>

              <Link href="/products">
                <a className="inline-block rounded-full bg-secondary px-8 py-3 text-center text-sm font-medium uppercase text-accent">
                  Shop Plants
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <section className="relative w-full py-16 px-6 lg:mx-auto lg:max-w-[1200px]">
        <div className="relative mb-16 flex items-center justify-between">
          <h2 className="font-display text-2xl font-medium text-accent lg:text-3xl">
            Our best-sellers
          </h2>

          <Link href="/products">
            <a className="flex shrink-0 items-center justify-center text-sm text-accent">
              View all <ArrowNarrowRightIcon className="ml-1 h-auto w-3" />
            </a>
          </Link>
        </div>

        <ProductCards products={featuredProducts} />
      </section>
    </>
  );
};

export default Home;
