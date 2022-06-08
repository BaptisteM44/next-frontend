import Link from "next/link";

export type ProductDetailsProps = {
  sku: string;
  category: {
    name: string;
    slug: string;
  };
  tags: {
    name: string;
    slug: string;
  }[];
};

const ProductDetails: React.FC<ProductDetailsProps> = ({
  sku,
  category,
  tags,
}) => {
  return (
    <div>
      <p className="mb-1 text-xs text-accent">SKU: {sku}</p>

      <p className="mb-1 text-xs text-accent">
        Category:&nbsp;
        <Link className="underline" href={`/category/${category.slug}`}>
          {category.name}
        </Link>
      </p>

      <p className="mb-1 text-xs text-accent">
        Tags:&nbsp;
        {tags.map((tag, i) => (
          <Link
            passHref
            className="underline"
            key={tag.slug}
            href={`/tag/${tag.slug}`}
          >
            <a>
              {tag.name}
              {i < tags.length - 1 ? ", " : ""}
            </a>
          </Link>
        ))}
      </p>
    </div>
  );
};

export default ProductDetails;
