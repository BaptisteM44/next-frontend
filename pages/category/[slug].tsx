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
  products: ProductCard[];
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

  const products = await findProductsByCategorySlug(slug).then(
    (categoryProducts) =>
      categoryProducts.map((categoryProduct) => ({
        category: {
          name: categoryProduct.attributes.product_category.data.attributes
            .name,
          slug: categoryProduct.attributes.product_category.data.attributes
            .slug,
        },
        imageSrc: categoryProduct.attributes.product_image.data.attributes.url,
        name: categoryProduct.attributes.product_name,
        onSale: categoryProduct.attributes.product_price.sale_price > 0,
        price: {
          regular: formatPrice(
            categoryProduct.attributes.product_price.regular_price
          ),
          sale: categoryProduct.attributes.product_price.sale_price
            ? formatPrice(categoryProduct.attributes.product_price.sale_price)
            : null,
        },
        slug: categoryProduct.attributes.slug,
      }))
  );

  const category = await findCategoryBySlug(slug);

  return { props: { products, category } };
};

const Category: NextPage<CategoryPageProps> = ({ products, category }) => {
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

          <ProductCards className="px-6" products={products} />
        </div>
      </section>
    </>
  );
};

export default Category;
