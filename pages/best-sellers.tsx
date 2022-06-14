import type { NextPage, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useMemo } from "react";

import ShopHeaderImageSrc from "@/public/images/shop-header.jpg";

import type { ProductCard, ProductCategory } from "@/types/ProductTypes";
import { getAllCategories, getAllFeaturedProducts } from "@/lib/api";
import { toProductCard } from "@/lib/apiCleaner";
import SEO from "@/components/SEO";
import Pagination from "@/components/Pagination";
import ProductsFilters from "@/components/products/ProductsFilters/ProductsFilters";
import ProductCards from "@/components/product/ProductCards/ProductCards";

type ProductsPageProps = {
  categories: ProductCategory[];
  products: ProductCard[];
};

export const getStaticProps: GetStaticProps<ProductsPageProps> = async () => {
  const categories = await getAllCategories().then((allCategories) =>
    allCategories.map((category) => ({
      name: category.attributes.name,
      slug: category.attributes.slug,
    }))
  );

  const products = await getAllFeaturedProducts().then((allProducts) =>
    allProducts.map((product) => toProductCard(product.attributes))
  );

  return { props: { categories, products } };
};

const Products: NextPage<ProductsPageProps> = ({ categories, products }) => {
  const router = useRouter();

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

  const handleCategorySelect = (slug: string) => {
    if (slug && slug !== "") {
      router.push(`/category/${slug}`);
    }
  };

  return (
    <>
      <SEO
        title="Best-sellers — Blooms Co."
        description="Browse through our growing collection of best-sellers flowers to find something beautiful for everyone on your list."
      />

      <section>
        <div className="relative min-h-[10rem] w-full">
          <Image
            src={ShopHeaderImageSrc}
            alt=""
            objectFit="cover"
            layout="fill"
            sizes="100vw"
            quality={70}
            placeholder="blur"
            priority
          />
        </div>

        <div className="px-6 lg:mx-auto lg:max-w-[1200px]">
          <h1 className="py-12 font-display text-3xl font-medium text-accent">
            Our best-sellers products
          </h1>

          <div className="mb-16 border-t border-b border-gray-200 py-8">
            <ProductsFilters
              categories={categories}
              onSelectCategory={handleCategorySelect}
            />
          </div>

          <ProductCards className="mb-16" products={pageProducts} />

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

export default Products;
