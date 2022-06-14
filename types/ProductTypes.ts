export type ProductTag = {
  slug: string;
  name: string;
};

export type ProductCategory = {
  slug: string;
  name: string;
};

export type ProductPrice = {
  regular: string;
  sale: string | null;
};

/**
 * Payload of a product card, should be used with `ProductCards`.
 */
export type ProductCard = {
  slug: string;
  imageSrc: string;
  name: string;
  category: ProductCategory;
  price: ProductPrice;
  onSale: boolean;
};

/**
 * Payload of a product in `/products/[slug]`
 */
export type ProductPage = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  sku: string;
  imageThumbnailSrc: string;
  imageGallery: {
    src: string;
    alt: string;
  }[];
  price: ProductPrice;
  snipcartPrice: string;
  category: ProductCategory;
  relatedProducts: ProductCard[];
};
