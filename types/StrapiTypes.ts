/**
 * Available image formats by default in Strapi.
 */
export enum StrapiImageFormats {
  thumbnail = "thumbnail",
  small = "small",
  medium = "medium",
  large = "large",
}

/**
 * Strapi pagination object.
 */
export type StrapiPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

/**
 * Strapi response when retrieving item(s).
 */
export type StrapiMultipleResponse<T> = {
  data: {
    id: number;
    attributes: T;
  }[];

  meta: {
    pagination: StrapiPagination;
  };
};

/**
 * Base Strapi component structure.
 */
export type StrapiComponent<T> = T & {
  id: number;
};

/**
 * Default properties added to every item in Strapi.
 */
export type BaseStrapiItemResponse = {
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale: string;
  localizations: unknown;
};

/**
 * Properties of an image format inside an image object.
 */
export type StrapiImageFormat = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
};

/**
 * Strapi image properties.
 */
export type StrapiImage = {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: { [format in StrapiImageFormats]: StrapiImageFormat };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown;
  createdAt: string;
  updatedAt?: string;
};

/**
 * Single Strapi image on an item.
 */
export type StrapiItemImage = {
  data: {
    id: number;
    attributes: StrapiImage;
  };
};

/**
 * Multiple Strapi images on an item.
 */
export type StrapiItemImages = {
  data: {
    id: number;
    attributes: StrapiImage;
  }[];
};

/**
 * Single Strapi relationship on an item.
 */
export type StrapiItemRelationship<T> = {
  data: {
    id: number;
    attributes: T;
  };
};

/**
 * Multiple Strapi relationships on an item.
 */
export type StrapiItemRelationships<T> = {
  data: {
    id: number;
    attributes: T;
  }[];
};

/**
 * Category properties.
 */
export type StrapiCategory = BaseStrapiItemResponse & {
  name: string;
  slug: string;
};

/**
 * Product properties.
 */
export type StrapiProduct = BaseStrapiItemResponse & {
  product_name: string;
  product_description: string;
  product_short_description: string;
  slug: string;
  product_price: StrapiComponent<{
    regular_price: number;
    sale_price: number;
  }>;
  product_inventory: StrapiComponent<{
    sku: string;
    in_stock: boolean;
  }>;
  linked_products: StrapiItemRelationships<StrapiProduct>;
  product_attributes: unknown;
  product_category: StrapiItemRelationship<StrapiCategory>;
  product_image: StrapiItemImage;
  product_images_gallery: StrapiItemImages;
};
