import type { StrapiProduct } from "@/types/StrapiTypes";
import type { ProductCard, ProductPage } from "@/types/ProductTypes";
import { formatPrice, formatSnipcartPrice } from "@/lib/formatPrice";

/**
 * Reduce Next.js payload by reducing a raw Strapi product to only essential
 * data required for the `ProductCards` component.
 *
 * @param product Strapi raw product payload.
 * @returns A product card object.
 */
export const toProductCard = (product: StrapiProduct): ProductCard => ({
  category: {
    name: product.product_category.data.attributes.name,
    slug: product.product_category.data.attributes.slug,
  },
  imageSrc: product.product_image.data.attributes.url,
  name: product.product_name,
  onSale: product.product_price.sale_price > 0,
  price: {
    regular: formatPrice(product.product_price.regular_price),
    sale: product.product_price.sale_price
      ? formatPrice(product.product_price.sale_price)
      : null,
  },
  slug: product.slug,
});

/**
 * Reduce Next.js payload by reducing a raw Strapi product to only essential
 * data required for the `products/[slug]` page.
 *
 * @param product Strapi raw product payload.
 * @returns A product page object.
 */
export const toProductPage = (product: StrapiProduct): ProductPage => ({
  slug: product.slug,
  name: product.product_name,
  shortDescription: product.product_short_description,
  description: product.product_description,
  sku: product.product_inventory.sku,
  imageThumbnailSrc:
    product.product_image.data.attributes.formats.thumbnail.url,
  imageGallery: product.product_images_gallery.data.map((image) => ({
    src: image.attributes.url,
    alt: image.attributes.alternativeText,
  })),
  price: {
    regular: formatPrice(product.product_price.regular_price),
    sale: product.product_price.sale_price
      ? formatPrice(product.product_price.sale_price)
      : null,
  },
  snipcartPrice: formatSnipcartPrice(
    product.product_price.sale_price || product.product_price.regular_price
  ),
  category: {
    name: product.product_category.data.attributes.name,
    slug: product.product_category.data.attributes.slug,
  },
  relatedProducts: product.linked_products.data.map((linkedProduct) =>
    toProductCard(linkedProduct.attributes)
  ),
});
