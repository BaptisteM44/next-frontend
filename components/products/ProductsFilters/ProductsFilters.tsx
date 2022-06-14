import type { ProductCategory } from "@/types/ProductTypes";

export type ProductsFiltersProps = {
  categories: ProductCategory[];
  onSelectCategory: (slug: string) => void;
};

const ProductsFilters: React.FC<ProductsFiltersProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <div className="flex">
      <select
        name="category"
        onChange={(event) => onSelectCategory(event.target.value)}
        className="rounded-md font-display text-base font-medium text-accent ring-accent ring-opacity-20 focus:outline-none focus:ring"
      >
        <option value="">Select a category</option>

        {categories.map((category) => (
          <option key={`category-${category.slug}`} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductsFilters;
