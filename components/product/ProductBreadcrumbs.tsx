import Link from "next/link";
import cx from "classnames";

import type { ProductCategory } from "@/types/ProductTypes";

export type ProductBreadcrumbsProps = {
  className?: string;
  category: ProductCategory;
  name: string;
};

const ProductBreadcrumbs: React.FC<ProductBreadcrumbsProps> = ({
  className,
  category,
  name,
}) => {
  return (
    <ol className={cx("flex items-center space-x-1", className)}>
      <li>
        <Link href="/products">
          <a className="text-xs text-accent">Products</a>
        </Link>
      </li>

      <li>
        <span className="text-xs text-accent text-opacity-50">/</span>
      </li>

      <li>
        <Link href={`/category/${category.slug}`}>
          <a className="text-xs text-accent">{category.name}</a>
        </Link>
      </li>

      <li>
        <span className="text-xs text-accent text-opacity-50">/</span>
      </li>

      <li>
        <span className="text-xs text-accent text-opacity-80">{name}</span>
      </li>
    </ol>
  );
};

export default ProductBreadcrumbs;
