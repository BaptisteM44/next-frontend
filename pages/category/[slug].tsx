import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import Image from "next/image";

import ShopHeaderImageSrc from "@/public/images/shop-header.jpg";

import type { ProductCard } from "@/types/ProductTypes";
import {
  getAllCategories,
  findProductsByCategorySlug,
  findCategoryBySlug,
} from "@/lib/api";
import { formatPrice } from "@/lib/formatPrice";
import SEO from "@/components/SEO";
import ProductCards from "@/components/product/ProductCards/ProductCards";

type StaticPropsParams = ParsedUrlQuery & {
  slug: string;
};

type CategoryPageProps = {
  products: Awaited<ReturnType<typeof findProductsByCategorySlug>>;
  category: Awaited<ReturnType<typeof findCategoryBySlug>>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getAllCategories();
  const categoriesPaths = categories.map((category) => ({
    params: { slug: category.attributes.slug },
  }));

  return {
    paths: categoriesPaths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  CategoryPageProps,
  StaticPropsParams
> = async (context) => {
  const { slug } = context.params!;
  const products = await findProductsByCategorySlug(slug);
  const category = await findCategoryBySlug(slug);

  return { props: { products, category } };
};

const Category: NextPage<CategoryPageProps> = ({ products, category }) => {
  const productsCards: ProductCard[] = products.map((product) => ({
    category: {
      name: product.attributes.product_category.data.attributes.name,
      slug: product.attributes.product_category.data.attributes.slug,
    },
    imageSrc: product.attributes.product_image.data.attributes.url,
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
        title={`${category.attributes.name} products — Blooms Co.`}
        description={`Browse through our growing collection of ${category.attributes.name} products to find something beautiful for everyone on your list.`}
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
            Our {category.attributes.name} products
          </h1>

          <ProductCards className="px-6" products={productsCards} />
        </div>
      </section>
    </>
  );
};

export default Category;
