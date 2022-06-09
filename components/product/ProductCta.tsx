export type ProductCtaProps = {
  children: React.ReactNode;
  id: string;
  name: string;
  price: number;
  description: string;
  imageSrc: string;
};

const ProductCta: React.FC<ProductCtaProps> = ({
  children,
  id,
  name,
  price,
  description,
  imageSrc,
}) => {
  return (
    <button
      type="button"
      className="rounded-full bg-accent px-6 py-3 text-sm font-medium uppercase tracking-wide text-tertiary transition-opacity duration-200 ease-in-out hover:bg-opacity-80"
      data-item-id={id}
      data-item-name={name}
      data-item-price={price}
      data-item-description={description}
      data-item-image={imageSrc}
    >
      {children}
    </button>
  );
};

export default ProductCta;
