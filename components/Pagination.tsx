import { useMemo } from "react";
import cx from "classnames";

export type PaginationProps = {
  className?: string;
  count: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  className,
  count,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const pages = useMemo(() => {
    const totalPages = Math.ceil(count / itemsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i);
  }, [count, itemsPerPage]);

  return (
    <div className={cx("w-full", className)}>
      <ul className="flex items-center justify-center">
        {pages.map((page) => (
          <li
            className="flex w-10 cursor-pointer items-center justify-center text-center"
            key={`page-${page}`}
          >
            <button
              type="button"
              className={cx(
                "block h-full w-full",
                page === currentPage ? "font-bold" : ""
              )}
              onClick={() => onPageChange(page)}
            >
              {page + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
