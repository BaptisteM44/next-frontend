import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import Image from "next/image";
import { useState, useMemo } from "react";

import ShopHeaderImageSrc from "@/public/images/shop-header.jpg";

import type { ProductCard } from "@/types/ProductTypes";
import {
  getAllCategories,
  findProductsByCategorySlug,
  findCategoryBySlug,
} from "@/lib/api";
import { toProductCard } from "@/lib/apiCleaner";
import SEO from "@/components/SEO";
import Pagination from "@/components/Pagination";
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
      categoryProducts.map((product) => toProductCard(product.attributes))
  );

  const category = await findCategoryBySlug(slug);

  return { props: { products, category } };
};

const Category: NextPage<CategoryPageProps> = ({ products, category }) => {
  const PRODUCTS_PER_PAGE = 8;

  const [currentPage, setCurrentPage] = useState(0);

  const pageProducts = useMemo(
    () =>
      products.slice(
        currentPage * PRODUCTS_PER_PAGE,
        (currentPage + 1) * PRODUCTS_PER_PAGE
      ),
    [currentPage, products]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

          <ProductCards className="mb-16 px-6" products={pageProducts} />

          <Pagination
            count={products.length}
            itemsPerPage={PRODUCTS_PER_PAGE}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </>
  );
};

export default Category;
