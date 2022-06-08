import type {
  StrapiMultipleResponse,
  StrapiProduct,
} from "@/types/StrapiTypes";

/**
 * Base fetch function for all Strapi API requests.
 *
 * @param endpoint Strapi API endpoint.
 * @returns `<T>` the type of the response.
 */
const fetchStrapi = async <T>(endpoint: string) => {
  const response = await fetch(`${process.env.STRAPI_BASE_URL}${endpoint}`);
  const json = (await response.json()) as T;

  return json;
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
