const ProductCta: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <button
      type="button"
      className="rounded-full bg-accent px-6 py-3 text-sm font-medium uppercase tracking-wide text-tertiary transition-opacity duration-200 ease-in-out hover:bg-opacity-80"
    >
      {children}
    </button>
  );
};

export default ProductCta;
