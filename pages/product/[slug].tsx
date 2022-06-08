import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import { useState } from "react";

import type { ProductCard as IProductCard } from "@/types/ProductTypes";
import { getAllProductsWithSlug, findProductBySlug } from "@/lib/api";
import { formatPrice } from "@/lib/formatPrice";
import SEO from "@/components/SEO";
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
  product: Awaited<ReturnType<typeof findProductBySlug>>;
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
  const product = await findProductBySlug(slug);

  return { props: { product } };
};

const Product: NextPage<ProductPageProps> = ({ product }) => {
  const [count, setCount] = useState(1);

  const images = product.attributes.product_images_gallery.data.map(
    (image) => ({
      src: image.attributes.url,
      alt: image.attributes.alternativeText,
    })
  );

  const price = {
    regular: formatPrice(product.attributes.product_price.regular_price),
    sale: product.attributes.product_price.sale_price
      ? formatPrice(product.attributes.product_price.sale_price)
      : null,
  };

  const category = {
    name: product.attributes.product_category.data.attributes.name,
    slug: product.attributes.product_category.data.attributes.slug,
  };

  const relatedProducts: IProductCard[] =
    product.attributes.linked_products.data.map((linkedProduct) => ({
      category: {
        name: linkedProduct.attributes.product_category.data.attributes.name,
        slug: linkedProduct.attributes.product_category.data.attributes.slug,
      },
      imageSrc: linkedProduct.attributes.product_image.data.attributes.url,
      name: linkedProduct.attributes.product_name,
      onSale: linkedProduct.attributes.product_price.sale_price > 0,
      price: {
        regular: formatPrice(
          linkedProduct.attributes.product_price.regular_price
        ),
        sale: linkedProduct.attributes.product_price.sale_price
          ? formatPrice(linkedProduct.attributes.product_price.sale_price)
          : null,
      },
      slug: linkedProduct.attributes.slug,
    }));

  return (
    <>
      <SEO
        title={`${product.attributes.product_name} — Blooms Co.`}
        description={product.attributes.product_short_description}
        imageUrl={images[0].src}
      />

      <div className="flex flex-col px-6 py-6 md:flex-row md:flex-wrap lg:mx-auto lg:max-w-[1200px]">
        <ProductImageGallery className="mb-6 md:w-1/2" images={images} />

        <section className="mb-12 md:w-1/2 md:pl-8 lg:pl-12">
          <h1 className="mb-4 font-display text-3xl font-medium leading-tight text-accent md:mb-8 md:text-4xl">
            {product.attributes.product_name}
          </h1>

          <p className="mb-4 font-display text-xl text-accent md:mb-8 md:text-2xl">
            {price.regular}€
          </p>

          <ProductDescription
            className="mb-8 md:mb-12"
            description={product.attributes.product_description}
          />

          <div className="mb-8 flex flex-row space-x-4 md:mb-12">
            <ProductCountCta
              count={count}
              handleAddCount={() => (count < 99 ? setCount(count + 1) : null)}
              handleRemoveCount={() => (count > 1 ? setCount(count - 1) : null)}
            />

            <ProductCta>Add to cart</ProductCta>
          </div>

          <ProductDetails
            sku={product.attributes.product_inventory.sku}
            category={category}
          />
        </section>

        {relatedProducts.length ? (
          <section className="md:w-full md:pt-24">
            <h2 className="mb-4 font-display text-xl text-accent lg:text-3xl lg:font-medium">
              Related products
            </h2>

            <ProductCards products={relatedProducts} />
          </section>
        ) : null}
      </div>
    </>
  );
};

export default Product;
