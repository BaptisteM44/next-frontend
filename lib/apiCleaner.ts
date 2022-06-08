import type { StrapiProduct } from "@/types/StrapiTypes";
import type { ProductCard } from "@/types/ProductTypes";
import { formatPrice } from "@/lib/formatPrice";

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
