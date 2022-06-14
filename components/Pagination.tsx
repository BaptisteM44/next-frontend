import { useMemo } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
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

  const goPreviousPage = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const goNextPage = () => {
    if (currentPage < pages.length - 1) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={cx("w-full", className)}>
      <ul className="flex items-center justify-center">
        <li className="flex w-10 cursor-pointer items-center justify-center text-center">
          <button
            type="button"
            className="text-accent"
            aria-label="Go to previous page"
            onClick={goPreviousPage}
          >
            <span aria-hidden="true">
              <ChevronLeftIcon className="h-auto w-4" />
            </span>
          </button>
        </li>

        {pages.map((page) => (
          <li
            className="flex w-10 cursor-pointer items-center justify-center text-center"
            key={`page-${page}`}
          >
            <button
              type="button"
              className={cx(
                "block h-full w-full text-accent",
                page === currentPage ? "font-bold" : ""
              )}
              onClick={() => onPageChange(page)}
            >
              {page + 1}
            </button>
          </li>
        ))}

        <li className="flex w-10 cursor-pointer items-center justify-center text-center">
          <button
            type="button"
            className="text-accent"
            aria-label="Go to next page"
            onClick={goNextPage}
          >
            <span aria-hidden="true">
              <ChevronRightIcon className="h-auto w-4" />
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
