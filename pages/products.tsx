import type { NextPage, GetStaticProps } from "next";
import Image from "next/image";

import ShopHeaderImageSrc from "@/public/images/shop-header.jpg";

import { getAllProducts } from "@/lib/api";
import { formatPrice } from "@/lib/formatPrice";
import { formatImageUrl } from "@/lib/formatImageUrl";
import SEO from "@/components/SEO";
import ProductCards from "@/components/product/ProductCards/ProductCards";

type ProductsPageProps = {
  products: Awaited<ReturnType<typeof getAllProducts>>;
};

export const getStaticProps: GetStaticProps<ProductsPageProps> = async () => {
  const products = await getAllProducts();

  return { props: { products } };
};

const Products: NextPage<ProductsPageProps> = ({ products }) => {
  const productsCards = products.map((product) => ({
    category: {
      name: product.attributes.product_category.data.attributes.name,
      slug: product.attributes.product_category.data.attributes.slug,
    },
    imageSrc: formatImageUrl(
      product.attributes.product_image.data.attributes.url
    ),
    name: product.attributes.product_name,
    onSale: product.attributes.product_price.sale_price > 0,
    price: {
      regular: formatPrice(product.attributes.product_price.regular_price),
      sale: product.attributes.product_price.sale_price
        ? formatPrice(product.attributes.product_price.sale_price)
        : null,
    },
    slug: product.attributes.slug,
  }));

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
            sizes="100vw"
            priority
          />
        </div>

        <div className="lg:mx-auto lg:max-w-[1200px]">
          <h1 className="py-12 px-6 font-display text-3xl font-medium text-accent">
            Our products
          </h1>

          <ProductCards className="px-6" products={productsCards} />
        </div>
      </section>
    </>
  );
};

export default Products;
