import type {
  StrapiMultipleResponse,
  StrapiProduct,
  StrapiCategory,
} from "@/types/StrapiTypes";

/**
 * Base fetch function for all Strapi API requests.
 *
 * @param endpoint Strapi API endpoint.
 * @returns `<T>` the type of the response.
 */
const fetchStrapi = async <T>(endpoint: string) => {
  const response = await fetch(`${process.env.STRAPI_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(
      `Unable to fetch ${process.env.STRAPI_BASE_URL}${endpoint}`
    );
  }

  const json = (await response.json()) as T;

  return json;
};

/**
 * Fetch all product categories.
 *
 * @returns All product categories.
 */
export const getAllCategories = async () => {
  const categories = await fetchStrapi<StrapiMultipleResponse<StrapiCategory>>(
    `/api/product-categories?populate=deep`
  );

  return categories.data;
};

/**
 * Fetch all products.
 *
 * @returns All products.
 */
export const getAllProducts = async () => {
  const products = await fetchStrapi<StrapiMultipleResponse<StrapiProduct>>(
    `/api/products?populate=deep`
  );

  return products.data;
};

/**
 * Fetch all products and map them into a list of `id` and `slug`.
 *
 * @returns List of products with `id` and `slug` properties.
 */
export const getAllProductsWithSlug = async () => {
  const products = await fetchStrapi<StrapiMultipleResponse<{ slug: string }>>(
    "/api/products?fields[0]=slug"
  );

  return products.data.map((product) => ({
    id: product.id,
    slug: product.attributes.slug,
  }));
};

/**
 * Find a category based on its slug.
 *
 * @param slug Category slug.
 * @returns Throw an error if no category is found.
 */
export const findCategoryBySlug = async (slug: string) => {
  const category = await fetchStrapi<StrapiMultipleResponse<StrapiCategory>>(
    `/api/product-categories?filters[slug][$eq]=${slug}&populate=deep`
  );

  if (!category.data.length) {
    throw new Error(`No category found for slug ${slug}`);
  }

  return category.data[0];
};

/**
 * Find a product based on its slug.
 *
 * @param slug Product slug.
 * @returns A product matching the given slug.
 * @throws Throws an error if no product is found.
 */
export const findProductBySlug = async (slug: string) => {
  const product = await fetchStrapi<StrapiMultipleResponse<StrapiProduct>>(
    `/api/products?filters[slug][$eq]=${slug}&populate=deep`
  );

  if (!product.data.length) {
    throw new Error(`No product found for slug ${slug}`);
  }

  return product.data[0];
};

/**
 * Fetch a list of product from a specific category.
 *
 * @param slug Category slug.
 * @returns A list of products.
 */
export const findProductsByCategorySlug = async (slug: string) => {
  const products = await fetchStrapi<StrapiMultipleResponse<StrapiProduct>>(
    `/api/products?filters[product_category][slug][$eq]=${slug}&populate=deep`
  );

  return products.data;
};
