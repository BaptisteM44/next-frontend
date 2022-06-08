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

export type ProductCard = {
  slug: string;
  imageSrc: string;
  name: string;
  category: ProductCategory;
  price: ProductPrice;
  onSale: boolean;
};
