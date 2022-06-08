import cx from "classnames";

import type { ProductCard as IProductCard } from "@/types/ProductTypes";

import ProductCard from "./ProductCard";

export type ProductCardsProps = {
  className?: string;
  products: IProductCard[];
};

const ProductCards: React.FC<ProductCardsProps> = ({ className, products }) => {
  return (
    <ol
      className={cx(
        "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 md:gap-8 lg:grid-cols-4",
        className
      )}
    >
      {products.map((product) => (
        <li className="h-auto w-full" key={product.slug}>
          <ProductCard product={product} />
        </li>
      ))}
    </ol>
  );
};

export default ProductCards;
