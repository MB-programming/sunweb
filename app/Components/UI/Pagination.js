import React from "react";
import { Icon } from "@iconify/react";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  itemsPerPage = 10,
  totalItems = 0
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
      {/* Items Info */}
      <div className="text-body text-sm">
        Showing <span className="text-white font-medium">{startItem}</span> to{" "}
        <span className="text-white font-medium">{endItem}</span> of{" "}
        <span className="text-white font-medium">{totalItems}</span> entries
      </div>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded border border-stroke hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white"
          aria-label="Previous page"
        >
          <Icon icon="mdi:chevron-left" width="20" />
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-body">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`px-4 py-2 rounded border transition-all ${
                  currentPage === page
                    ? 'bg-main text-black border-main font-semibold'
                    : 'border-stroke text-white hover:bg-white/5'
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded border border-stroke hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white"
          aria-label="Next page"
        >
          <Icon icon="mdi:chevron-right" width="20" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
