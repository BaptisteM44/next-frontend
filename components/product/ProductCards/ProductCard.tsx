import Link from "next/link";
import Image from "next/image";

import type { ProductCard as IProductCard } from "@/types/ProductTypes";

export type ProductCardProps = {
  product: IProductCard;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="h-auto w-full">
      <Link href={`/product/${product.slug}`} passHref>
        <a className="relative mb-4 block h-[250px] md:h-[500px] lg:h-[300px]">
          <Image
            className="rounded-md"
            src={product.imageSrc}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            quality={75}
            sizes="50vw"
            priority
          />
        </a>
      </Link>

      <Link href={`/category/${product.category.slug}`} passHref>
        <a className="mb-2 block text-xs text-accent">
          {product.category.name}
        </a>
      </Link>

      <Link href={`/product/${product.slug}`} passHref>
        <a className="mb-2 block font-display text-base font-medium text-accent">
          {product.name}
        </a>
      </Link>

      <p className="font-display text-base text-accent">
        <span
          className={
            product.price.sale ? "mr-2 text-gray-500 line-through" : ""
          }
        >
          {product.price.regular}€
        </span>

        {product.onSale ? (
          <span className="mr-2">{product.price.sale}€</span>
        ) : null}
      </p>
    </div>
  );
};

export default ProductCard;
