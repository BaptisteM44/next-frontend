import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";

export type ProductCountCtaProps = {
  count: number;
  handleAddCount: () => void;
  handleRemoveCount: () => void;
};

const ProductCountCta: React.FC<ProductCountCtaProps> = ({
  count,
  handleAddCount,
  handleRemoveCount,
}) => {
  return (
    <div className="flex items-center justify-center rounded-full border border-gray-200 px-6 py-3">
      <button
        type="button"
        className="h-full pr-2 font-medium text-accent focus:outline-none"
        onClick={handleRemoveCount}
        aria-label="Remove"
      >
        <MinusSmIcon aria-hidden="true" className="-ml-2 h-auto w-4" />
      </button>

      <span className="mx-auto inline-block w-6 text-center font-display text-sm text-black">
        {count}
      </span>

      <button
        type="button"
        className="h-full pl-2 font-medium text-accent focus:outline-none"
        onClick={handleAddCount}
        aria-label="Add"
      >
        <PlusSmIcon aria-hidden="true" className="-mr-2 h-auto w-4" />
      </button>
    </div>
  );
};

export default ProductCountCta;
