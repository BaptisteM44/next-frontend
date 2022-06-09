import type { NextPage, GetStaticProps } from "next";
import Image from "next/image";

import ShopHeaderImageSrc from "@/public/images/shop-header.jpg";

import type { ProductCard } from "@/types/ProductTypes";
import { getAllProducts } from "@/lib/api";
import { toProductCard } from "@/lib/apiCleaner";
import SEO from "@/components/SEO";
import ProductCards from "@/components/product/ProductCards/ProductCards";

type ProductsPageProps = {
  products: ProductCard[];
};

export const getStaticProps: GetStaticProps<ProductsPageProps> = async () => {
  const products = await getAllProducts().then((allProducts) =>
    allProducts.map((product) => toProductCard(product.attributes))
  );

  return { props: { products } };
};

const Products: NextPage<ProductsPageProps> = ({ products }) => {
  return (
    <>
      <SEO
        title="Products — Blooms Co."
        description="Browse through our growing collection of popular flowers to find something beautiful for everyone on your list."
      />

      <section>
        <div className="relative min-h-[10rem] w-full">
          <Image
            src={ShopHeaderImageSrc}
            alt=""
            objectFit="cover"
            layout="fill"
            sizes="25vw"
            priority
          />
        </div>

        <div className="lg:mx-auto lg:max-w-[1200px]">
          <h1 className="py-12 px-6 font-display text-3xl font-medium text-accent">
            Our products
          </h1>

          <ProductCards className="px-6" products={products} />
        </div>
      </section>
    </>
  );
};

export default Products;
