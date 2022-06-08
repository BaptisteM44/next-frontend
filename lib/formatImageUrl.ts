export const formatImageUrl = (imageUrl: string) =>
  `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${imageUrl}`;
