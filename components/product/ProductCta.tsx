export type ProductCtaProps = {
  children: React.ReactNode;
  id: string;
  name: string;
  price: string;
  description: string;
  imageSrc: string;
  pageUrl: string;
};

const ProductCta: React.FC<ProductCtaProps> = ({
  children,
  id,
  name,
  price,
  description,
  imageSrc,
  pageUrl,
}) => {
  return (
    <button
      type="button"
      className="snipcart-add-item rounded-full bg-accent px-6 py-3 text-sm font-medium uppercase tracking-wide text-tertiary transition-opacity duration-200 ease-in-out hover:bg-opacity-80"
      data-item-id={id}
      data-item-name={name}
      data-item-price={price}
      data-item-description={description}
      data-item-image={imageSrc}
      data-item-url={pageUrl}
    >
      {children}
    </button>
  );
};

export default ProductCta;
