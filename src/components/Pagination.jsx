import React from "react";

const Pagination = React.memo(({ currentPage, totalPages, onPageChange }) => {
  // Helper to generate page numbers dynamically
  const generatePageNumbers = (total) =>
    Array.from({ length: total }, (_, i) => i + 1);

  return (
    <nav
      className="pagination mt-6 flex justify-center items-center space-x-2"
      aria-label="Pagination Navigation"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-white border border-black text-black rounded transition-all duration-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Go to previous page"
        rel="nofollow"
      >
        Prev
      </button>

      {generatePageNumbers(totalPages).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded border-black ${
            currentPage === page
              ? "border-[1.5px]  bg-[#e0e0e0]"
              : " bg-white text-black hover:bg-gray-100"
          } transition-all duration-200`}
          aria-current={currentPage === page ? "page" : undefined}
          aria-label={`Go to page ${page}`}
          rel="nofollow"
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border border-black bg-white text-black rounded transition-all duration-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Go to next page"
        rel="nofollow"
      >
        Next
      </button>

      {/* Announce page changes for screen readers */}
      <div className="sr-only" aria-live="polite">
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  );
});

export default Pagination;
