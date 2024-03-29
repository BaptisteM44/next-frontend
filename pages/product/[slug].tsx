import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import { useRouter } from "next/router";

import type { ProductPage } from "@/types/ProductTypes";
import { getAllProductsWithSlug, findProductBySlug } from "@/lib/api";
import { toProductPage } from "@/lib/apiCleaner";
import SEO from "@/components/SEO";
import ProductBreadcrumbs from "@/components/product/ProductBreadcrumbs";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductDescription from "@/components/product/ProductDescription/ProductDescription";
import ProductCountCta from "@/components/product/ProductCountCta";
import ProductCta from "@/components/product/ProductCta";
import ProductDetails from "@/components/product/ProductDetails";
import ProductCards from "@/components/product/ProductCards/ProductCards";

type StaticPropsParams = ParsedUrlQuery & {
  slug: string;
};

type ProductPageProps = {
  product: ProductPage;
  productBlurDataUrl: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getAllProductsWithSlug();
  const productsPaths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  return {
    paths: productsPaths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  ProductPageProps,
  StaticPropsParams
> = async (context) => {
  const { slug } = context.params!;
  const product = await findProductBySlug(slug).then((response) =>
    toProductPage(response.attributes)
  );

  const productBlurDataUrl = await fetch(product.imageThumbnailSrc)
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      const base64 = Buffer.from(buffer).toString("base64");
      return `data:image/webp;base64,${base64}`;
    });

  return { props: { product, productBlurDataUrl } };
};

const Product: NextPage<ProductPageProps> = ({
  product,
  productBlurDataUrl,
}) => {
  const router = useRouter();

  const [count, setCount] = useState(1);

  return (
    <>
      <SEO
        title={`${product.name} — Blooms Co.`}
        description={product.shortDescription}
        imageUrl={product.imageGallery[0].src}
      />

      <div className="flex flex-col px-6 py-6 md:flex-row md:flex-wrap lg:mx-auto lg:max-w-[1200px]">
        <ProductBreadcrumbs
          className="mb-6 md:hidden"
          category={product.category}
          name={product.name}
        />

        <section className="mb-6 md:w-1/2">
          <ProductBreadcrumbs
            className="mb-6 hidden md:flex"
            category={product.category}
            name={product.name}
          />

          <ProductImageGallery
            images={product.imageGallery}
            blurDataUrl={productBlurDataUrl}
          />
        </section>

        <section className="mb-12 md:w-1/2 md:pl-8 lg:pl-12">
          <h1 className="mb-4 font-display text-3xl font-medium leading-tight text-accent md:mb-8 md:text-4xl">
            {product.name}
          </h1>

          <p className="mb-4 font-display text-xl text-accent md:mb-8 md:text-2xl">
            <span
              className={
                product.price.sale ? "mr-2 text-gray-500 line-through" : ""
              }
            >
              {product.price.regular}€
            </span>

            {product.price.sale ? <span>{product.price.sale}€</span> : null}
          </p>

          <ProductDescription
            className="mb-8 md:mb-12"
            description={product.description}
          />

          <div className="mb-8 flex flex-row space-x-4 md:mb-12">
            <ProductCountCta
              count={count}
              handleAddCount={() => (count < 99 ? setCount(count + 1) : null)}
              handleRemoveCount={() => (count > 1 ? setCount(count - 1) : null)}
            />

            <ProductCta
              id={product.slug}
              name={product.name}
              price={product.snipcartPrice}
              description={product.shortDescription}
              imageSrc={product.imageGallery[0].src}
              pageUrl={router.asPath}
            >
              Add to cart
            </ProductCta>
          </div>

          <ProductDetails sku={product.sku} category={product.category} />
        </section>

        {product.relatedProducts.length ? (
          <section className="md:w-full md:pt-24">
            <h2 className="mb-6 font-display text-xl text-accent lg:text-3xl lg:font-medium">
              Related products
            </h2>

            <ProductCards products={product.relatedProducts} />
          </section>
        ) : null}
      </div>
    </>
  );
};

export default Product;
