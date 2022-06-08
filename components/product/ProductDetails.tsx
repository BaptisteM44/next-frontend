import Link from "next/link";

export type ProductDetailsProps = {
  sku: string;
  category: {
    name: string;
    slug: string;
  };
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ sku, category }) => {
  return (
    <div>
      <p className="mb-1 text-xs text-accent">SKU: {sku}</p>

      <p className="mb-1 text-xs text-accent">
        Category:&nbsp;
        <Link className="underline" href={`/category/${category.slug}`}>
          {category.name}
        </Link>
      </p>
    </div>
  );
};

export default ProductDetails;
